import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import dotProp from 'dot-prop-immutable-chain'

import './index.css'

import AdCard from './AdCard'
import AdDetails from './AdDetails'

import {getAd, getAdDetails, showAd, zoomAd, unzoomAd, showAdForm, initDraft} from '../../store/actions'
import {getCatsByName} from '../../store/selectors'

class Ad extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    view: PropTypes.oneOf(['card', 'details']).isRequired,
  }

  constructor(props) {
    super(props)

    //this.onReload = this.onReload.bind(this)
  }

  componentWillMount() {
    const {ad, loadAd} = this.props

    if (ad) return

    loadAd()
  }


  render() {
    const {id, ad, view, onShowAdDetails, onZoom, onUnzoom, loadAd, onEdit, cats} = this.props
    const catId = dotProp(ad).get('eth.data.catId').value()

    const commonProps = {
      onReload: loadAd,
      onEdit: onEdit,
      catName: catId ? cats[catId].name : ''
    }

    return (ad
      ?
        (view === 'card'
        ?
          <AdCard
            ad={ad}
            onShowAdDetails={onShowAdDetails}
            {...commonProps}
          />
        :
          <AdDetails
            ad={ad}
            onZoom={onZoom}
            onUnzoom={onUnzoom}
            {...commonProps}
          />
        )
      :
        null
    )
  }
}

export default connect((state, ownProps) => {
    return {
      ad: state.ads.byId[ownProps.id],
      cats: state.cats
    }
  }, (dispatch, ownProps) => {
    const id = ownProps.id

    return {
      loadAd: async () => {
        await dispatch(getAd(id))
        dispatch(getAdDetails(id))
      },
      onShowAdDetails: () => {
        dispatch(showAd(id))
      },
      onEdit: (ad) => {
        const draftId = `${ad.id}_${ad.eth.data.updatedAt}`
        /* clean drafts */
        dispatch(initDraft(draftId, {
          id: ad.id,
          catId: ad.eth.data.catId,
          header: ad.bzz.data.header,
          text: ad.bzz.data.text,
          photos: ad.bzz.data.photos
        }))
        dispatch(showAdForm(draftId))
      },
      onZoom: () => {
        dispatch(zoomAd())
      },
      onUnzoom: () => {
        dispatch(unzoomAd())
      },
    }
  }
)(Ad)

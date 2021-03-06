import React, {Component} from 'react'
import {Provider} from 'react-redux'
// import {web3} from './provider'

import AppBar from './components/AppBar'
import Board from './components/Board'
// import Requirements from './components/Requirements'
import store from './store'

import 'react-perfect-scrollbar/dist/css/styles.css'

import 'typeface-roboto'
import CssBaseline from '@material-ui/core/CssBaseline'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    fontSize: 10,
    htmlFontSize: 11,
  },
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <CssBaseline />

            <AppBar />

            <Board />
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App







/*
async onClick() {

  return
  const { web3 } = window

  console.log('thisstate............................contract')
  console.dir(this.state.contract)
  console.log( web3.eth.defaultAccount)

//    let res = await this.state.contract.methods.upPrice().call() //{from: web3.eth.defaultAccount}
//  console.dir(res)

  const receipt = await this.state.contract.methods._setUpPrice(Web3.utils.toWei('99999', 'ether')).send({
    from: web3.eth.defaultAccount,
    gasPrice : Web3.utils.toWei('1', 'gwei'),
    gas: 35000,
    value: 0,
  })

  console.log('receipt')
  console.dir(receipt)

  const price = await this.state.contract.methods.upPrice().call()

  console.log('price = ', price)
*/
  /*.on('receipt', receipt => {
    console.log('receipt')
    console.dir(receipt)
    this.state.contract.methods.upPrice().call()
      .then(price => console.log('price = ', price))
  }).on('error', (err, receit) => {
    console.log('err = ', err)
    console.log('error receit')
    console.dir(receit)
  })*/




  /*.then((res) => {
    console.log('then')
    console.dir(res)
  }).catch((error) => {
    console.log('error')
    console.dir(error)
  })
    .on('transactionHash', function(hash){
      console.log('transactionHash', hash)
    })

    .on('confirmation _setUpPrice', function(confirmationNumber, receipt){
      console.log('confirmation', confirmationNumber)
      console.dir(receipt)
    })

}*/

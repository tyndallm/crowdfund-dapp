import React, { Component } from 'react'
import AccountList from 'components/AccountList/AccountList'

import FundingHub from 'contracts/FundingHub.sol';
import Web3 from 'web3';

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
FundingHub.setProvider(provider);

class AccountListContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accounts: [],
      coinbase: ''
    }

    this._getAccountBalance = this._getAccountBalance.bind(this)
    this._getAccountBalances = this._getAccountBalances.bind(this)
  }

  _getAccountBalance (account) {
    var fundingHub = FundingHub.deployed();
    // return new Promise((resolve, reject) => {
    //   meta.getBalance.call(account, {from: account}).then(function (value) {
    //     resolve({ account: value.valueOf() })
    //   }).catch(function (e) {
    //     console.log(e)
    //     reject()
    //   })
    // })
  }

  _getAccountBalances () {
    this.props.web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        window.alert('There was an error fetching your accounts.')
        console.error(err)
        return
      }

      if (accs.length === 0) {
        window.alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
        return
      }

      this.setState({coinbase: accs[0]})

      var accountsAndBalances = accs.map((account) => {
        return this._getAccountBalance(account).then((balance) => { return { account, balance } })
      })

      Promise.all(accountsAndBalances).then((accountsAndBalances) => {
        this.setState({accounts: accountsAndBalances, coinbaseAccount: accountsAndBalances[0]})
      })
    }.bind(this))
  }

  componentDidMount() {
    const refreshBalances = () => {
      this._getAccountBalances()
    }

    refreshBalances()

    setInterval(()=>{
      refreshBalances();
      return refreshBalances
    }, 5000)
  }

  render() {
    return (
      <div>
        <AccountList accounts={this.state.accounts} />
      </div>
    )
  }
}

export default AccountListContainer

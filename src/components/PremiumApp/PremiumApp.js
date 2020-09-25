import React from "react";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import PlaidLinkButton from "react-plaid-link-button";
import { connect } from "react-redux";

import { Button, Box, Typography } from "@material-ui/core";

import { Link } from "react-router-dom";

import { addAccount, getTransactions } from "../../actions/accountActions";


class PremiumApp extends React.Component {
  constructor(props) {
    //super(props);
  }

  componentDidMount() {
    const { accounts, transactions } = this.props.plaid;
      if(accounts.length > 0 && transactions.length < 1) {
        this.props.getTransactions(accounts);
      }
  }

  // Add account
  handleOnSuccess = (token, metadata) => {
    const plaidData = {
      public_token: token,
      metadata: metadata
    };
    this.props.addAccount(plaidData);
  };

  render() {
    const { link, accounts, accountsLoading, transactions, transactionsLoading} = this.props.plaid;

    let expensesData = [];
    let incomeData = [];
    let holdingData = [];
    let spendingData = [];
    let spendingChartKey = [];
    let spendingChartValue = [];
    let incomeChartKey = [];
    let incomeChartValue = [];
    let totalSpending = 0;
    let totalIncome = 0;
    let imageWidth;
    let imageHeight;
    let variant;

    transactions.forEach(function(account) {
      account.transactions.forEach(function(transaction) {
        if(Math.sign(transaction.amount) > 0) {
          expensesData.push({
            category: transaction.category[0].trim(),
            amount: Math.abs(transaction.amount)
          });
        }
        if(Math.sign(transaction.amount) < 0) {
          incomeData.push({
            category: transaction.category[0].trim(),
            amount: Math.abs(transaction.amount)
          });
        }
      });
    });

    expensesData.reduce(function(res, value) {
        if (!res[value.category]) {
          res[value.category] = { category: value.category , amount: 0 };
          spendingData.push(res[value.category])
        }
        res[value.category].amount += value.amount;
        totalSpending += value.amount;
        return res;
    }, {});

    incomeData.reduce(function(res, value) {
        if (!res[value.category]) {
          res[value.category] = { category: value.category , amount: 0 };
          holdingData.push(res[value.category])
        }
        res[value.category].amount -= value.amount;
        totalIncome -= value.amount;
        return res;
    }, {});

    // spending data is converted to an Chart state array [category]
    // user spending categories in an array
    spendingData.reduce(function(res, value) {
        if (!res[value.category]) {
          res[value.category] =  value.category;
          spendingChartKey.push(res[value.category])
        }
        return res;
    }, {});

    // spending data is converted to an Chart state array [amount]
    // user spending category amounts in an array
    spendingData.reduce(function(res, value) {
        if (!res[value.category]) {
          res[value] =  value.amount;
          spendingChartValue.push(res[value].toFixed(2))
        }
        return res;
    }, {});


    // income data is converted to an Chart state array [category]
    // user income categories in an array
    holdingData.reduce(function(res, value) {
    if (!res[value.category]) {
        res[value.category] =  value.category;
        incomeChartKey.push(res[value.category])
    }
    return res;
    }, {});

    // income data is converted to an Chart state array [amount]
    // user income category amounts in an array
    holdingData.reduce(function(res, value) {
    if (!res[value.category]) {
        res[value] =  value.amount;
        incomeChartValue.push(res[value].toFixed(2))
    }
    return res;
    }, {});

    // let spendItems = spendingData.map(item => (
    //   <li key={item.category} style={{ marginTop: "1rem" }}>
    //     <span  className="col s9 left text-left">{item.category}</span>
    //     <span  className="col s3 left text-left">$-{Math.abs(item.amount.toFixed(2))}</span>
    //     <br/>
    //   </li>
    // ));

    // let earnedItems = holdingData.map(item => (
    //   <li key={item.category} style={{ marginTop: "1rem" }}>
    //     <span  className="col s9 left text-left">{item.category}</span>
    //     <span  className="col s3 left text-left">${Math.abs(item.amount.toFixed(2))}</span>
    //     <br/>
    //   </li>
    // )); 

    // Chart data is rendered to ChartJS format
    // user spending per category pie chart
    let cashflowChart = {
      labels: ['Income','Expenses'],
      datasets: [{
                  data: [Math.abs(totalIncome).toFixed(2),Math.abs(totalSpending).toFixed(2)],
                  backgroundColor: [
                    "#46BFBD",
                    "#F7464A"
                  ],
                  hoverBackgroundColor: [
                    "#5AD3D1",
                    "#FF5A5E"
                  ]
                }]
    };
  
    switch (this.props.size) {
      case "small":
        imageWidth = 40;
        imageHeight = 40;
        variant = "h6";
        break;
  
      case "medium":
        imageWidth = 60;
        imageHeight = 60;
        variant = "h5";
        break;
  
      case "large":
        imageWidth = 100;
        imageHeight = 100;
        variant = "h4";
        break;
  
      default:
        imageWidth = 60;
        imageHeight = 60;
        variant = "h5";
        break;
    }

    if (accounts.length > 0) {
      if (this.props.type === "page") {
        return (
          <Box
            style={{ transform: "translate(-50%, -50%)" }}
            position="absolute"
            top="50%"
            left="50%"
            textAlign="center"
          >
            {this.props.image && (
              <Box
                clone
                mb={this.props.title || this.props.description ? 2 : 0}
                width={`${imageWidth}%`}
                height={`${imageHeight}%`}
              >
                {this.props.image}
              </Box>
            )}
              <Box mb={!this.props.description && this.props.button ? 2 : 0}>
                <Typography variant={variant}>My Account Snapshot</Typography>
              </Box>
              <Box mb={this.props.button && 2}>
                <Typography variant="body1">
                  You have <b> {accounts.length}</b> linked bank
                  {accounts.length > 1 ? (
                  <span> accounts </span>
                  ) : (
                  <span> account </span>
                  )}
                </Typography>
              </Box>
              <Box mb={this.props.button && 2}>
                <hr/>
                {transactionsLoading || accountsLoading ? (
                    <Typography>Refreshing 30 day transactions...</Typography>
                ) : (
                  <>        
                    <Box style={{width: '100%'}}>
                      <div style={{marginLeft: '15%', marginRight: '15%'}}>
                        <Doughnut data={cashflowChart}/>
                      </div>
                      <br/>
                    </Box>
                    <Box style={{width: '100%'}}>
                      <div style={{marginLeft: '15%', marginRight: '15%'}}>
                        <Box style={{textAlign: 'center'}}>
                          <Typography color="textPrimary" variant="body1" >
                          INCOME...................$ {Math.abs(totalIncome).toFixed(2)}
                          </Typography>
                        </Box>                        
                      </div>
                    </Box>
                    <Box style={{width: '100%'}}>
                      <div style={{marginLeft: '15%', marginRight: '15%'}}>
                        <Box style={{textAlign: 'center'}}>
                          <Typography color="textPrimary" variant="body1">
                          EXPENSES................$ -{Math.abs(totalSpending).toFixed(2)}
                          </Typography>
                        </Box>
                      </div>
                    </Box>
                  </>
                  )}
                  <hr/>
                  <Box>
                      <PlaidLinkButton
                        buttonProps={{
                          className:
                            "btn btn-large main-btn link-button"
                        }}
                        plaidLinkProps={{
                          token: link.link_token,
                          clientName: process.env.REACT_APP_CLIENT,
                          key: process.env.REACT_APP_PLAID_PUBLIC_KEY,
                          env: process.env.REACT_APP_ENVIRONMENT,
                          product: ["transactions"],
                          onSuccess: this.handleOnSuccess
                        }}
                        onScriptLoad={() => this.setState({ loaded: true })}
                      >
                        Link Account
                      </PlaidLinkButton>
                  </Box>
                  <Box mb={this.props.button && 2}>
                      <br/>
                      <Button component={Link} to="/" style={{margin: "2%", width: "65%"}} variant="outlined" size="large" color="primary">Go Back</Button>
                  </Box>
              </Box>
            {this.props.button && this.props.button}
          </Box>
        );
      }
      if (this.props.type === "card") {
        return (
          <Box padding={this.props.padding} textAlign="center">
            {this.props.image && (
              <Box
                clone
                mb={this.props.title || this.props.description ? 2 : 0}
                width={`${imageWidth}%`}
                height={`${imageHeight}%`}
              >
                {this.props.image}
              </Box>
            )}
    
              <Box mb={!this.props.description && this.props.button ? 2 : 0}>
                <Typography variant={variant}>My Account Snapshot</Typography>
              </Box>
              <Box mb={this.props.button && 2}>
                <Typography variant="body1">
                  You have <b> {accounts.length}</b> linked bank
                  {accounts.length > 1 ? (
                  <span> accounts </span>
                  ) : (
                  <span> account </span>
                  )}
                </Typography>
              </Box>
              <Box mb={this.props.button && 2}>
                <hr/>
                {transactionsLoading || accountsLoading ? (
                    <Typography>Refreshing 30 day transactions...</Typography>
                ) : (
                  <>        
                    <Box style={{width: '100%'}}>
                      <div style={{marginLeft: '15%', marginRight: '15%'}}>
                        <Doughnut data={cashflowChart}/>
                      </div>
                      <br/>
                    </Box>
                    <Box style={{width: '100%'}}>
                      <div style={{marginLeft: '15%', marginRight: '15%'}}>
                        <Box style={{textAlign: 'center'}}>
                          <Typography color="textPrimary" variant="body1" >
                          INCOME...................$ {Math.abs(totalIncome).toFixed(2)}
                          </Typography>
                        </Box>                        
                      </div>
                    </Box>
                    <Box style={{width: '100%'}}>
                      <div style={{marginLeft: '15%', marginRight: '15%'}}>
                        <Box style={{textAlign: 'center'}}>
                          <Typography color="textPrimary" variant="body1">
                          EXPENSES................$ -{Math.abs(totalSpending).toFixed(2)}
                          </Typography>
                        </Box>
                      </div>
                    </Box>
                  </>
                  )}
                  <hr/>
                  <Box>
                      <PlaidLinkButton
                        buttonProps={{
                          className:
                            "btn btn-large main-btn link-button"
                        }}
                        plaidLinkProps={{
                          token: link.link_token,
                          clientName: process.env.REACT_APP_CLIENT,
                          key: process.env.REACT_APP_PLAID_PUBLIC_KEY,
                          env: process.env.REACT_APP_ENVIRONMENT,
                          product: ["transactions"],
                          onSuccess: this.handleOnSuccess
                        }}
                        onScriptLoad={() => this.setState({ loaded: true })}
                      >
                        Link Account
                      </PlaidLinkButton>
                  </Box>
                  <Box mb={this.props.button && 2}>
                      <br/>
                      <Button component={Link} to="/" style={{margin: "2%", width: "65%"}} variant="outlined" size="large" color="primary">Go Back</Button>
                  </Box>
              </Box>
            {this.props.button && this.props.button}
          </Box>
        );
      }

    } else {
      if (this.props.type === "page") {
        return (
          <Box
            style={{ transform: "translate(-50%, -50%)" }}
            position="absolute"
            top="50%"
            left="50%"
            textAlign="center"
          >
            {this.props.image && (
              <Box
                clone
                mb={this.props.title || this.props.description ? 2 : 0}
                width={`${imageWidth}%`}
                height={`${imageHeight}%`}
              >
                {this.props.image}
              </Box>
            )}
    
            {this.props.title && (
              <Box mb={!this.props.description && this.props.button ? 2 : 0}>
                <Typography variant={variant}>{this.props.title}</Typography>
              </Box>
            )}
    
            {this.props.description && (
              <Box mb={this.props.button && 2}>
                <Typography variant="body1">{this.props.description}</Typography>
              </Box>
            )}
              <Box mb={this.props.button && 2}>
                  <Button component={Link} to="/learn" variant="text">
                    LEARN MORE
                  </Button>
                  <br/>
                  <Typography variant={variant}>Lets get started?</Typography>
                  <Typography variant="body1">Link your bank account and connect with our secure payment system</Typography>
                  <Button component={Link} to="/learn" variant="text">
                    LEARN MORE
                  </Button>
                  <br/>
                  <Box>
                      <PlaidLinkButton
                        buttonProps={{
                          className:
                            "btn btn-large main-btn link-button"
                        }}
                        plaidLinkProps={{
                          token: link.link_token,
                          clientName: process.env.REACT_APP_CLIENT,
                          key: process.env.REACT_APP_PLAID_PUBLIC_KEY,
                          env: process.env.REACT_APP_ENVIRONMENT,
                          product: ["transactions"],
                          onSuccess: this.handleOnSuccess
                        }}
                        onScriptLoad={() => this.setState({ loaded: true })}
                      >
                        Link Account
                      </PlaidLinkButton>
                  </Box>
                  <Box mb={this.props.button && 2}>
                      <br/>
                      <Button component={Link} to="/" style={{margin: "2%", width: "65%"}} variant="outlined" size="large" color="primary">Go Back</Button>
                  </Box>
              </Box>
            {this.props.button && this.props.button}
          </Box>
        );
      }
    
      if (this.props.type === "card") {
        return (
          <Box padding={this.props.padding} textAlign="center">
            {this.props.image && (
              <Box
                clone
                mb={this.props.title || this.props.description ? 2 : 0}
                width={`${imageWidth}%`}
                height={`${imageHeight}%`}
              >
                {this.props.image}
              </Box>
            )}
    
            {this.props.title && (
              <Box mb={!this.props.description && this.props.button ? 2 : 0}>
                <Typography variant={variant}>{this.props.title}</Typography>
              </Box>
            )}
            {this.props.description && (
              <Box mb={this.props.button && 2}>
                <Typography variant="body1">{this.props.description}</Typography>
              </Box>
            )}
              <Box mb={this.props.button && 2}>
                  <Button component={Link} to="/learn" variant="text">
                    LEARN MORE
                  </Button>
                  <br/>
                  <Typography variant={variant}>Lets get started?</Typography>
                  <Typography variant="body1">Link your bank account and connect with our secure payment processing system</Typography>
                  <Button component={Link} to="/learn" variant="text">
                    LEARN MORE
                  </Button>
                  <br/>
                  <Box>
                      <PlaidLinkButton
                        buttonProps={{
                          className:
                            "btn btn-large main-btn link-button"
                        }}
                        plaidLinkProps={{
                          token: link.link_token,
                          clientName: process.env.REACT_APP_CLIENT,
                          key: process.env.REACT_APP_PLAID_PUBLIC_KEY,
                          env: process.env.REACT_APP_ENVIRONMENT,
                          product: ["transactions"],
                          onSuccess: this.handleOnSuccess
                        }}
                        onScriptLoad={() => this.setState({ loaded: true })}
                      >
                        Link Account
                      </PlaidLinkButton>
                  </Box>
                  <Box mb={this.props.button && 2}>
                      <br/>
                      <Button component={Link} to="/" style={{margin: "2%", width: "65%"}} variant="outlined" size="large" color="primary">Go Back</Button>
                  </Box>
              </Box>
            {this.props.button && this.props.button}
          </Box>
        );
      }
    }
  
    return null;
  }

}

PremiumApp.defaultProps = {
  type: "page",
  size: "medium",
  padding: 2,
};

PremiumApp.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  padding: PropTypes.number,

  image: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.element,

  getTransactions: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  transactions: PropTypes.array.isRequired,
  accounts: PropTypes.array.isRequired,
  plaid: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  plaid: state.plaid
});

export default connect(
  mapStateToProps,
  { addAccount, getTransactions}
)(PremiumApp);

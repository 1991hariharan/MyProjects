import { connect } from "react-redux";
import React, { Component } from "react";
import { strategyAction } from "../actions/strategy";
import { Helper } from "../common/helper";
import Loader from 'react-loader'
import { CommonLogic} from '../common/commonLogic'
class ViewStrategyDetail extends Component {
  componentWillMount = () => {
    const strategyId = this.props.match.params.id;
    this.props.updateStrategyDetail({});
    this.props.getStrategyDetail(strategyId);
  };
  goBack = function() {
    this.props.history.push("/ViewStrategy");
  };
  reset = () => {
    const detail = JSON.parse(JSON.stringify( this.props.strategy.detail))
    detail.instruments.forEach(item => {
        item.newValue = undefined;
    });
    this.props.updateStrategyDetail(detail);
  }
  reBalance = () => {
    const detail = JSON.parse(JSON.stringify( this.props.strategy.detail))
    const { assetClass,assetClassDetails } = this.getAssetClass(
        detail.instruments
      );
    const modifiedDetail = CommonLogic.reBalance(assetClass, detail,assetClassDetails);
    this.props.updateStrategyDetail(modifiedDetail);
  }
  setWeight = function(id,assetClass, e){
    const textboxValue = e.target.value;
    let value = textboxValue.length === 0 || isNaN(textboxValue) ? 0 : parseFloat(textboxValue);
    
   
    const detail = JSON.parse(JSON.stringify( this.props.strategy.detail))
    const updatedInstruments = detail.instruments.map(item => {
        if(item.id === id && item.asset_class === assetClass){
            item.newValue = value;
        }
        return item;
    });
    const updatedDetails = {
        ...detail,
        instruments : updatedInstruments
    }
    this.props.updateStrategyDetail(updatedDetails);
  }
  getAssetClass = function(details) {
    let assetClass = [];
    let assetClassDetails = {};
    details.forEach(item => {
      let detail = {
        id: item.id,
        name: item.name,
        model_weight: item.model_weight,
        actual_weight: item.actual_weight,
        newValue : item.newValue
      };
      if (assetClass.indexOf(item.asset_class) === -1) {
        assetClass.push(item.asset_class);
        assetClassDetails[item.asset_class] = {
          model_weight: item.model_weight,
          actual_weight: item.actual_weight,
          items: [detail]
        };
      } else {
        assetClassDetails[item.asset_class].model_weight = (
          parseFloat(assetClassDetails[item.asset_class].model_weight) +
          parseFloat(item.model_weight)
        ).toFixed(2);
        assetClassDetails[item.asset_class].actual_weight = (
          parseFloat(assetClassDetails[item.asset_class].actual_weight) +
          parseFloat(item.actual_weight)
        ).toFixed(2);
        assetClassDetails[item.asset_class].items.push(detail);
      }
    });
    return { assetClass, assetClassDetails };
  };
  render() {
    if (
      this.props.strategy &&
      this.props.strategy.detail &&
      this.props.strategy.detail.instruments
    ) {
      const { assetClass, assetClassDetails } = this.getAssetClass(
        JSON.parse(JSON.stringify(this.props.strategy.detail.instruments))
      );
      return (
        <div className="root-panel">
          <div className="header">
            <span className="label">View Strategy Detail</span>
          </div>
          <div className="title">
            <table id="button-sec" className="table" width="100%">
              <tbody>
                <tr>
                  <td width="60%">Portfolio Constituents</td>
                  <td width="7%">
                    <button type="button" className="btn-primary custom" onClick={e=> this.reset()}>
                      Reset
                    </button>
                  </td>
                  <td width="10%">
                    <button type="button" className="btn-primary custom" onClick={e => this.reBalance()}>
                      Rebalance
                    </button>
                  </td>
                  <td width="23%">
                    <button
                      type="button"
                      className="btn-primary custom"
                      onClick={e => this.goBack()}
                    >
                      Go Back
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid">
            <div className="row">
              <div className="header-row col-lg-8 col-sm-7">Category/Stock</div>
              <div className="header-row col-lg-2 col-sm-3">
                Modal Weight(%)
              </div>
              <div className="header-row col-lg-2 col-sm-2">Weight(%)</div>
            </div>
            {assetClass.map((asset, index) => {
              return (
                <div key={index}>
                  <div className="row">
                    <div className="body-row col-lg-8 col-sm-7">
                      {Helper.capitalize(asset)}
                    </div>
                    <div className="header-row col-lg-2 col-sm-3">
                      {assetClassDetails[asset].model_weight}%
                    </div>
                    <div className="header-row col-lg-2 col-sm-2">
                      {assetClassDetails[asset].actual_weight !== assetClassDetails[asset].model_weight ?
                      assetClassDetails[asset].model_weight : assetClassDetails[asset].actual_weight }%
                    </div>
                  </div>
                  {assetClassDetails[asset].items.map((item, index) => {
                    const imageUrl = require("../assets/images/pointer.png");
                    return (
                      <div className="row" key={index}>
                        <div className="subitem-row col-lg-8 col-sm-7">
                          <table width="100%">
                            <tbody>
                              <tr>
                                <td width="3%">
                                  <img src={imageUrl} alt="" />
                                </td>
                                <td width="97%">
                                  {Helper.capitalize(item.name)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="header-row col-lg-2 col-sm-3">
                          {item.model_weight}%
                        </div>
                        <div className="header-row col-lg-2 col-sm-2">
                          <input
                            type="number"
                            className="weight-box"
                            value={item.newValue === undefined ? item.actual_weight : item.newValue}
                            onChange={e=> this.setWeight(item.id,asset,e)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (<Loader loaded={false} options={CommonLogic.getLoaderConfig()}  className="spinner" />);
    }
  }
}

const mapStateToProps = state => {
  let { strategy } = state;
  return { strategy };
};

const mapDispatchToProps = dispatch => ({
  getStrategyDetail: Id => {
    dispatch(strategyAction.getStrategyDetail(Id));
  },
  updateStrategyDetail: detail => {
    dispatch(strategyAction.updateStrategyDetail(detail));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewStrategyDetail);

import { connect } from "react-redux";
import React, { Component } from "react";
import Card from "./Card";
import { strategyAction } from "../actions/strategy";
import Loader from 'react-loader'
import { CommonLogic} from '../common/commonLogic'
class ViewStrategy extends Component {
  componentWillMount = () => {
    this.props.getStrategyList();
  };
  onClick = Id => {
    this.props.history.push("/ViewStrategyDetail/" + Id);
  };
  render() {
    if (this.props.strategy && this.props.strategy.list) {
      return (
        <div className="root-panel">
          <div className="header">
            <span className="label">View Strategy</span>
          </div>
          <div className="content">
            <Card list={this.props.strategy.list} onClick={this.onClick}></Card>
          </div>
        </div>
      );
    } else {

      return (<Loader loaded={false} options={CommonLogic.getLoaderConfig()} className="spinner" />);
    }
  }
}

const mapStateToProps = state => {
  let { strategy } = state;
  return { strategy };
};

const mapDispatchToProps = dispatch => ({
  getStrategyList: () => {
    dispatch(strategyAction.getStrategyList());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewStrategy);

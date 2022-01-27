import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from "redux"
import { RootReducer } from "../../store/reducers"
import { setRoutesList } from "../../store/actions/app"

class Counter extends Component<any> {
  public render() {
    const { ddd, app } = this.props;
    return <div onClick={ddd.bind(this,{test:app.test + 1})} >{app.test}</div>;
  }
}

const mapStateToProps = ({ app }: RootReducer) => {
  return { app };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ddd: (val: any) => {
    return dispatch(setRoutesList(val))
  },
})



export default connect(mapStateToProps, mapDispatchToProps)(Counter);
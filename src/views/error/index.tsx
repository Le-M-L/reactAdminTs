import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from "redux"
import { RootReducer } from "@/store/reducers"
import { setRoutesList } from "../../store/actions/app"

class Error extends Component<any> {
  public render() {
    const { action, app } = this.props;
    return <div onClick={action.bind(this,{test:app.test + 1})} >{app.test}</div>;
  }
}

const mapStateToProps = ({ app }: RootReducer) => {
  return { app };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  action: (val: any) => {
    return dispatch(setRoutesList(val))
  },
})



export default connect(mapStateToProps, mapDispatchToProps)(Error);
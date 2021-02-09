import "./index.less";
import * as React from "react";
import { Avatar, Col, List, Row, Input, Button } from "antd";
import Stores from "../../stores/storeIdentifier";
import { inject, observer } from "mobx-react";
import AppConsts from "../../utils/appconst";
import RecordDtrTable from "../../components/RecordDtrTable";

const { Search } = Input;

@inject(Stores.RecordStore, Stores.UserStore)
@observer
class Profile extends React.Component<any> {
  
  async componentDidMount() {
   
  }

  handleOnchange = () => {
    this.setState({
      ...this.state,
      peopleData: this.props.userStore.allUsers,
    });
  };

  render() {
    return (
      <Row>
        <h1>Coming Soon....</h1>
      </Row>
    );
  }
}

export default Profile;

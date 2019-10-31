import * as React from 'react';
// import { graphql, QueryProps, MutationFunc, compose } from 'react-apollo';
import {withRouter, RouteComponentProps, Link} from 'react-router-dom';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';

export default class SubTabPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 0,
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tabNo: any) {
    this.setState({
      activeTab: tabNo,
    });
  }

  render() {
    const {activeTab} = this.state;
    return (
      <section className="tab-container row vertical-tab-container">
        <Nav tabs className="pl-3 pl-3 mb-4 mt-4 col-sm-2">
          <p className="customMargin">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nobis, vel
            aliquid!
          </p>
          <NavItem className="cursor-pointer">
            <NavLink
              className={`${activeTab === 0 ? 'side-active' : ''}`}
              id="cstmTab"
              onClick={() => {
                this.toggleTab(0);
              }}
            >
              Test V
            </NavLink>
          </NavItem>
          <NavItem className="cursor-pointer">
            <NavLink
              className={`${activeTab === 1 ? 'side-active' : ''}`}
              id="cstmTab1"
              onClick={() => {
                this.toggleTab(1);
              }}
            >
              Test 2V
            </NavLink>
          </NavItem>
          <NavItem className="cursor-pointer">
            <NavLink
              className={`${activeTab === 2 ? 'side-active' : ''}`}
              id="cstmTab2"
              onClick={() => {
                this.toggleTab(2);
              }}
            >
              Test 3V
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="col-sm-9 border-left p-t-1">
          <TabPane tabId={0}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, assumenda
              iste inventore eaque temporibus pariatur optio deserunt recusandae provident
              odio libero corrupti qui eum ex quas? Obcaecati natus distinctio atque. Et
              atque ea doloribus sed!
            </p>

            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Middle Name" className="tabm-1" />
            <input type="text" placeholder="last Name" />
          </TabPane>
          <TabPane tabId={1}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              repudiandae quidem repellat, tempore consectetur consequuntur. Aliquid eaque
              necessitatibus ducimus voluptatem optio velit est quasi tempora sed
              consectetur iusto, aperiam voluptatibus!
            </p>
            <input type="text" placeholder="Father Name" />
            <input type="text" placeholder="Contact Number" className="tabm-1" />
          </TabPane>
          <TabPane tabId={2}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur sequi
              molestias perspiciatis quibusdam fuga sunt voluptatum, deleniti deserunt
              tenetur dolorum. Sunt ipsa dicta facilis assumenda provident. Necessitatibus
              sapiente quaerat numquam ex beatae ducimus! Assumenda quasi eveniet maxime
              dolorem sit tempora neque cupiditate beatae provident voluptatum?
            </p>
            <input type="text" placeholder="Mother Name" />
            <input type="text" placeholder="Contact Number" className="tabm-1" />
          </TabPane>
        </TabContent>
      </section>
    );
  }
}

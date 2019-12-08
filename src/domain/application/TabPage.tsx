import * as React from 'react';
// import { graphql, QueryProps, MutationFunc, compose } from 'react-apollo';
import {withRouter, RouteComponentProps, Link} from 'react-router-dom';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import SubTabPage from './SubTabPage';
import SearchTabPage from './SearchTabPage';
import {FaUserGraduate} from 'react-icons/fa';
import Filters from './filters/Filters';
import Utils from './utils/Utils';

export default class TabPage extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			activeTab: 0,
		};
		this.toggleTab = this.toggleTab.bind(this);
		this.stResHandler = this.stResHandler.bind(this);
		this.tchrResHandler = this.tchrResHandler.bind(this);
	}

	toggleTab(tabNo: any) {
		this.setState({
			activeTab: tabNo,
		});
	}

	stResHandler(data: any) {
		let html = '';
		if (data && Array.isArray(data)) {
			html = Utils.createTableByArray(data);
		}
		this.setState({
			stResult: html,
		});
	}

	tchrResHandler(data: any) {
		let html = '';
		if (data && Array.isArray(data)) {
			html = Utils.createTableByArray(data);
		}
		this.setState({
			tchrResult: html,
		});
	}

	render() {
		const {activeTab} = this.state;
		return (
			<section className="tab-container">
				<div>
					{/* <img src="../../img/students.png" alt="" /> */}
					<h5>
						<FaUserGraduate className="m-r-1" />Student
					</h5>
				</div>
				<Nav tabs className="pl-3 pl-3 mb-4 mt-4 boxShadow">
					<NavItem className="cursor-pointer">
						<NavLink
							className={`${activeTab === 0 ? 'active' : ''}`}
							onClick={() => {
								this.toggleTab(0);
							}}
						>
							Search
						</NavLink>
					</NavItem>
					<NavItem className="cursor-pointer">
						<NavLink
							className={`${activeTab === 1 ? 'active' : ''}`}
							onClick={() => {
								this.toggleTab(1);
							}}
						>
							Search Students
						</NavLink>
					</NavItem>
					<NavItem className="cursor-pointer">
						<NavLink
							className={`${activeTab === 2 ? 'active' : ''}`}
							onClick={() => {
								this.toggleTab(2);
							}}
						>
							Search Teachers
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={activeTab} className="border-right">
					<TabPane tabId={0}>
						<SearchTabPage />
					</TabPane>
					<TabPane tabId={1}>
						<div>
							<Filters
								json={Filters.studentJson}
								cls="com.synectiks.cms.entities.Student"
								resultCallback={this.stResHandler}
								isApply="true"
							/>
							<div dangerouslySetInnerHTML={{__html: this.state.stResult}} />
						</div>
					</TabPane>
					<TabPane tabId={2}>
						<div>
							<Filters
								json={Filters.teacherJson}
								cls="com.synectiks.cms.entities.Teacher"
								resultCallback={this.tchrResHandler}
								isApply="true"
							/>
							<div dangerouslySetInnerHTML={{__html: this.state.tchrResult}} />
						</div>
					</TabPane>
				</TabContent>
			</section>
		);
	}
}

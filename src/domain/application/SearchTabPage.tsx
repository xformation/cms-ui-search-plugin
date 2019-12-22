import * as React from 'react';
import Utils from './utils/Utils';
import QueryPanel from './query/QueryPanel';

const entBaseClsPkg: string = 'com.synectiks.cms.entities.';

const LIST_ENTITIES: string = "http://localhost:8092/search/getIndexes?pkg=com.synectiks.cms.entities";
const LIST_FIELDS: string = "http://localhost:8092/search/getIndexMapping?fieldsOnly=true&cls=";

export default class SearchTabPage extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			isLoading: true,
			entities: [],
			cols: [],
			selEntity: '',
			selCols: [],
			resTbl: '',
		};
		this.showResData = this.showResData.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onSelChange = this.onSelChange.bind(this);
		this.keyPressed = this.keyPressed.bind(this);
		this.onSelCols = this.onSelCols.bind(this);
		this.submit = this.submit.bind(this);
	}

	componentWillMount() {
		Utils.getReq(LIST_ENTITIES).then(response => {
			this.setState({
				entities: response.data,
				isLoading: false
			});
		}).catch(err => {
			console.log("Failed to fetch result.");
			this.setState({
				isLoading: false
			});
		});
	}

	onSelChange(e: any) {
		const val = e.target.value;
		if (val) {
			console.log('selected entity: ' + val);
			Utils.getReq(LIST_FIELDS + val).then(response => {
				this.setState({
					cols: response.data,
					selEntity: val
				});
			}).catch(err => {
				console.log("Failed to fetch result.");
			});
		} else {
			this.setState({
				selEntity: '',
				cols: [],
			});
		}
	}

	onSelCols(e: any) {
		const arr = Array.from(e.target.selectedOptions, (item: any) => item.value);
		if (arr && arr.length > 0) {
			this.setState({
				selCols: arr,
			});
		}
	}

	handleChange(e: any) {
		let val = e.target.value;
		this.setState({
			query: val,
		});
	}

	keyPressed(e: any) {
		if (e.key === 'Enter') {
			let val = e.target.value;
			if (val && val.trim() !== '' && val.trim().length > 0) {
				this.submit();
			}
		}
	}

	submit() {
		console.log('Entity: ', this.state.selEntity);
		console.log('Cols: ', this.state.selCols);
		console.log('Query: ', this.state.query);
		const url = 'http://localhost:8092/search/query';
		let params = '';
		if (this.state.selEntity) {
			const val = this.state.selEntity;
			params += 'cls=' + val + '&';
		}
		if (this.state.selCols && this.state.selCols.length > 0) {
			let fields = '';
			this.state.selCols.map((item: string) => {
				fields += fields.length > 0 ? ', ' : '';
				fields += item;
			});
			params += 'fields=' + fields + '&';
		}
		params += 'q=' + this.state.query;
		console.log('Url: ', url, params);
		Utils.getReq(url + '?' + params).then(response => {
			this.showResData(response);
		});
	}

	showResData(response: any) {
		console.log('res: ', response.data);
		let res = response.data;
		if (typeof response.data === 'string') {
			res = JSON.parse(response.data);
		}
		if (res && res.hits && res.hits.hits) {
			res = res.hits.hits;
		}
		const html = Utils.createTableByArray(res, null, true);
		this.setState({
			resTbl: html,
		});
	}

	render() {
		if (this.state.isLoading) {
			return (
				<div className="divLoader">
					<img src="public/plugins/cms-ui-search-plugin/img/loader.gif" alt="Loader" />
				</div>
			);
		} else {
			return (
				<div key="divContainer" style={{textAlign: 'center'}}>
					<table style={{width: '100%'}}>
						<tbody>
							<tr>
								<td key="lftPnl">
									<table>
										<tbody>
											<tr>
												<td>
													Search for: &nbsp;
													<select
														key="selEntity"
														onChange={this.onSelChange}
														value={this.state.selEntity}
													>
														<option key="defEnt" value="">
															--Select--
														</option>
														{this.state.entities.map((item: any) => (
															<option key={item} value={item}>
																{item.replace(entBaseClsPkg, '')}
															</option>
														))}
													</select>
												</td>
											</tr>
											<tr>
												<td>
													in columns: &nbsp;
													<select
														multiple={true}
														key="selCols"
														onChange={this.onSelCols}
														value={this.state.selCols}
													>
														{this.state.cols.map((item: any) => (
															<option key={item} value={item}>
																{item}
															</option>
														))}
													</select>
												</td>
											</tr>
											<tr>
												<td>
													Query: &nbsp;
													<input
														type="text"
														key="search"
														onChange={this.handleChange}
														value={this.state.query || ''}
														onKeyPress={this.keyPressed}
													/>
												</td>
											</tr>
											<tr>
												<td>
													<button key="searchBtn" onClick={this.submit}>
														Search
													</button>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
								<td>
									<QueryPanel id="trans" isTranslate="true"
										resHandler={this.showResData} entities={this.state.entities}/>
								</td>
							</tr>
							<tr>
								<td colSpan={2} key="rghtPnl" style={{overflowY: 'auto'}}>
									<div dangerouslySetInnerHTML={{__html: this.state.resTbl}} />
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		}
	}
}

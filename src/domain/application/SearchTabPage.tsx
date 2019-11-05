import * as React from 'react';
import Utils from './utils/Utils';

const entBaseClsPkg: string = 'com.synectiks.cms.domain.';

const json: any = {
	Country: {
		id: 1,
		countryName: 'INDIA',
		countryCode: 'IN',
		isdCode: '+91',
	},
	Branch: {
		state: '',
		city: '',
		address: '',
	},
};
export default class SearchTabPage extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			entities: SearchTabPage.getEntities(),
			cols: [],
			selEntity: '',
			selCols: [],
			resTbl: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.onSelChange = this.onSelChange.bind(this);
		this.keyPressed = this.keyPressed.bind(this);
		this.onSelCols = this.onSelCols.bind(this);
		this.submit = this.submit.bind(this);
	}

	onSelChange(e: any) {
		const val = e.target.value;
		if (val) {
			console.log('selected entity: ' + val);
			console.log('value: ', json[val]);
			const keys = SearchTabPage.getEntities(json[val]);
			this.setState({
				selEntity: val,
				cols: keys,
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
			const val = entBaseClsPkg + this.state.selEntity;
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
			console.log('res: ', response.data);
			let res = response.data;
			if (typeof response.data === 'string') {
				res = JSON.parse(response.data);
			}
			const html = Utils.createTableByArray(res, null, true);
			this.setState({
				resTbl: html,
			});
		});
	}

	render() {
		return (
			<div key="divContainer" style={{textAlign: 'center'}}>
				<table>
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
															{item}
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
							<td key="rghtPnl" style={{overflowY: 'auto'}}>
								<div dangerouslySetInnerHTML={{__html: this.state.resTbl}} />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	static getEntities(ent: any = null) {
		const obj = ent ? ent : json;
		const keys: any = [];
		Object.keys(obj).forEach(key => {
			keys.push(key);
		});
		return keys;
	}
}

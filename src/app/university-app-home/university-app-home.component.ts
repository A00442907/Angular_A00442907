import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-university-app-home',
	templateUrl: './university-app-home.component.html',
	styleUrls: ['./university-app-home.component.scss']
})

export class UniversityAppHomeComponent implements OnInit {

	name!: string;
	search_name!: string;
	address!: string;
	phone!: string;
	message: any;
	errorMessage: any;
	data: any;
	constructor(private http: HttpClient) {
		this.name = '';
		this.search_name = '';
		this.address = '';
		this.phone = '';
		this.message = '';
		this.errorMessage = '';
		this.data = [];
	}
	ngOnInit() {
	}
	saveUniversity() {
		this.data = {
			"Name": this.name,
			"Address": this.address,
			"Phone": this.phone
		}

		if (this.name == '') {
			alert("Please Enter the University Name");
			return false;
		}
		if (this.address == '') {
			alert("Please Enter the University Address");
			return false;
		}
		if (this.phone == '') {
			alert("Please Enter the University Phone Number");
			return false;
		}

		this.http.post<any>('http://dev.cs.smu.ca:8142/addUniversity',
			this.data).subscribe({
				next: data => {
					this.message = data.message;

				},
				error: error => {
					this.errorMessage = error.message;

				}
			})
		return true;
	}
	removeUniversity() {
		const data = {
			'Name': this.name,
		}
		this.http.post<any>('http://dev.cs.smu.ca:8142/deleteUniversity',
			data).subscribe(
				(dataResponse) => {
					if (dataResponse.n == 0) {
						alert('University Data Not Found')
					} else {
						alert('University Successfully Deleted')
					}
				},
				(err) => console.log(err)
			);
	}
	searchUniversity() {
		const data = {
			'Name': this.search_name,
		}
		this.http.post<any>('http://dev.cs.smu.ca:8142/searchUniversity',
			data).subscribe(
				(dataResponse) => {
					if (dataResponse.n == 0) {
						alert('University Data Not Found')
					} else {
						console.log(dataResponse)
					}
				},
				(err) => console.log(err)
			);
	}
	searchAllUniversity() {
		const data = {}
		this.http.post<any>('http://dev.cs.smu.ca:8142/searchAllUniversity',
			data).subscribe(
				(dataResponse) => {
					if (dataResponse.n == 0) {
						alert('University Data Not Found')
					}
				},
				(err) => console.log(err)
			);
	}
}
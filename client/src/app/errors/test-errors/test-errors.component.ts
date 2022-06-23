import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseBuggyURL = "https://localhost:5001/api/";
  validationErrors: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error() {
    this.http.get(this.baseBuggyURL + "buggy/not-found").subscribe({
      next: response => console.log(response),
      error: err => console.log(err),
    });
  }

  get401Error() {
    this.http.get(this.baseBuggyURL + "buggy/auth").subscribe({
      next: response => console.log(response),
      error: err => console.log(err),
    });
  }

  get400Error() {
    this.http.get(this.baseBuggyURL + "buggy/bad-request").subscribe({
      next: response => console.log(response),
      error: err => console.log(err),
    });
  }

  get400ValidationError() {
    this.http.post(this.baseBuggyURL + "account/register", {}).subscribe({
      next: response => console.log(response),
      error: err => {
        console.log(err);
        this.validationErrors = err;
      }
    });
  }

  get500Error() {
    this.http.get(this.baseBuggyURL + "buggy/server-error").subscribe({
      next: response => console.log(response),
      error: err => console.log(err),
    });
  }

}

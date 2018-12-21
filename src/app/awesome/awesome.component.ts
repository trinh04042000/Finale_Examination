import {Component, OnInit} from '@angular/core';
import {Awesome} from '../awesome';
import {AwesomeService} from '../awesome.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-awesome',
    templateUrl: './awesome.component.html',
    styleUrls: ['./awesome.component.scss']
})
export class AwesomeComponent implements OnInit {
    awesomeList: Awesome[] = [];
    awesomeForm: FormGroup;

    constructor(private awesomeService: AwesomeService, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.awesomeForm = this.fb.group({
            tag: ['', [Validators.required, Validators.minLength(10)]],
            url: ['', [Validators.required, Validators.minLength(10)]],
            descriptions: ['', [Validators.required, Validators.minLength(10)]],
        });
        this.awesomeService.getAwesomes().subscribe(data => {
                this.awesomeList = data;
            }, error => {
                console.log(error);
            }, () => {
                console.log('completed');
            }
        );

    }

    deleteAwesome(i) {
        const awesome = this.awesomeList[i];
        this.awesomeService.deleteAwesomes(awesome.id).subscribe(() => {
            this.awesomeList = this.awesomeList.filter(t => t.id !== awesome.id);
        });
    }

    onSubmit() {
        if (this.awesomeForm.valid) {
            const {value} = this.awesomeForm;
            this.awesomeService.createAwesome(value).subscribe(next => {
                this.awesomeList.unshift(next);
                this.awesomeForm.reset({
                    tag: '',
                    url: '',
                    descriptions: ''
                });
            }, error => console.log(error));
        }
    }
}

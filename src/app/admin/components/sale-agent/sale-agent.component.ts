import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SalesAgentService} from '../../../common/services/sales-agent.service';
import {MessageService} from '../../../common/services';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {BranchService} from '../../../common/services/branch.service';
import {SalesAgent} from '../../../common/models/sales-agent.model';

export interface SalesAgentGrid {
  id: number;
  name: string;
  username: string;
  contact: string;
  branch: string;
}

@Component({
  selector: 'app-sale-agent',
  templateUrl: './sale-agent.component.html',
  styleUrls: ['./sale-agent.component.scss']
})

export class SaleAgentComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private salesAgent: SalesAgent = {id: 0, name: '', username: '', password: '', contactNo: '', branchId: 0};
  private initialObject: any;
  datasourceArr: SalesAgentGrid[] = [];
  private row: SalesAgentGrid;
  displayedColumns: string[] = ['name', 'username', 'contact', 'branch'];
  branches = [];

  datasource: MatTableDataSource<SalesAgentGrid>;

  salesAgentForm: FormGroup;

  constructor(private saleAgentService: SalesAgentService,
              private branchService: BranchService,
              private formBuilder: FormBuilder,
              private message: MessageService) {
  }

  ngOnInit(): void {
    this.salesAgentForm = this.formBuilder.group({
      id: [null],
      name: [null],
      username: [null],
      password: [null],
      contactNo: [null],
      branchId: [null]
    });
    this.loadAllSalesAgents();
    this.loadAllBranches();
  }

  async loadAllSalesAgents() {
    this.saleAgentService.getAllSalesAgents().subscribe((data: any) => {

      for (const value of data) {
        this.row = {
          id: value.id,
          name: value.name,
          username: value.username,
          contact: value.contactNo,
          branch: value.branchId.branchName
        };
        console.log('Row : ', this.datasourceArr);
        this.datasourceArr.push(this.row );
      }
      this.datasourceArr = data.object;
      console.log('Object : ', this.datasourceArr);
      this.datasource = new MatTableDataSource<SalesAgentGrid>(this.datasourceArr);
      this.datasource.paginator = this.paginator;
    });
  }

  onSave() {
    if (this.salesAgentForm.valid) {
      this.salesAgent = {
        id: this.salesAgentForm.get('id').value,
        name: this.salesAgentForm.get('name').value,
        username: this.salesAgentForm.get('username').value,
        password: this.salesAgentForm.get('password').value,
        contactNo: this.salesAgentForm.get('contactNo').value,
        branchId: this.salesAgentForm.get('branchId').value
      };
    }
    if (this.salesAgent.username === null || this.salesAgent.branchId === 0) {
      this.message.error('WARNING', 'Fields cannot be empty');
    } else {
      this.saleAgentService.saveSalesAgent(this.salesAgentForm.value).subscribe(() => {
        this.message.success('SAVE_SUCCESSFUL', 'Sales Agent Save Successful');
        this.salesAgentForm.reset();
        this.loadAllSalesAgents();
        // this.salesAgentForm.get('name').enable();
      });
    }
  }

  onUpdate() {
    if (this.salesAgentForm.valid) {
      this.salesAgent = {
        id: this.salesAgentForm.get('id').value,
        name: this.salesAgentForm.get('name').value,
        username: this.salesAgentForm.get('username').value,
        password: this.salesAgentForm.get('password').value,
        contactNo: this.salesAgentForm.get('contactNo').value,
        branchId: this.salesAgentForm.get('branchId').value
      };
    }
    this.saleAgentService.updateSalesAgent(this.salesAgent).subscribe(() => {
      this.message.success('UPDATE_SUCCESSFUL', 'Sales agent details updated');
      this.salesAgentForm.reset(this.initialObject);
      this.loadAllSalesAgents();
    });
  }

  selectedRole(selectedSalesAgent) {
    this.salesAgent.id = selectedSalesAgent.id;
    this.salesAgentForm.get('name').setValue(selectedSalesAgent.name);
    this.salesAgentForm.get('username').setValue(selectedSalesAgent.username);
    this.salesAgentForm.get('contactNo').setValue(selectedSalesAgent.contactNo);
  }

  onDelete() {
    if (this.salesAgent.id !== 0) {
      this.saleAgentService.deleteSalesAgent(this.salesAgent.id).subscribe(() => {
        this.message.success('DELETE_SUCCESSFUL', 'Sales Agent delete successful');
        this.salesAgentForm.reset(this.initialObject);
        this.loadAllSalesAgents();
      }, error => {
        this.message.error('WARNING', error);
        this.salesAgentForm.reset();
        this.salesAgentForm.get('skill').enable();
      });
    }
  }

  loadAllBranches(){
    this.branchService.findAllBranches().subscribe((value: any) => {
      this.branches = value.object;
      console.log('Branches : ', this.branches);
    });
  }

}

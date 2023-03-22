import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { BLDetail, BLItem, HBLDetail } from '../data-item';

const BLPARAMS = {
  vname: 'vesselName',
  voyageNo: 'voyageNo',
  rotation: 'rotation',
  ppl: 'ppl',
  port: 'port',
  terminal: 'terminal',
  blNumber: 'blNumber',
  isHBL: 'isHBL',
  hblNumber: 'hblNumber',
  shipperName: 'shipperName',
  shipperAddress: 'shipperAddress',
  consigneeName: 'consigneeName',
  consigneeAddress: 'consigneeAddress',
  notifyPartyName: 'notifyPartyName',
  notifyPartyAddress: 'notifyPartyAddress',
  pol: 'pol',
  pod: 'pod',
  containerNo: 'containerNo',
  sealNo: 'sealNo',
  marksNnumbers: 'marksNnumbers',
  description: 'description',
  grossWeight: 'grossWeight',
  grosswtDropdowm: 'grosswtDropdowm',
};

@Component({
  selector: 'app-test-application',
  templateUrl: './test-application.component.html',
  styleUrls: ['./test-application.component.css'],
})
export class TestApplicationComponent implements OnInit {
  blForm!: UntypedFormGroup;
  blItems!: UntypedFormArray;
  hblForm!: UntypedFormGroup;
  currentBLForm?: BLDetail;
  currentBLItem?: BLItem;
  expandSet = new Set<number>();
  visibleBL = false;
  visibleHbl = false;
  readonly BLPARAMS = BLPARAMS;

  listOfData: BLDetail[] = [];

  pplList = [
    { name: 'Tracking', id: 1 },
    { name: 'Management', id: 2 },
  ];
  portList = [
    { name: 'Loading', id: 1 },
    { name: 'Unloading', id: 2 },
  ];

  terminalList = [
    { name: 'Chennai', id: 1 },
    { name: 'Mumbai', id: 2 },
  ];

  radioBtn = [
    { name: 'Yes', id: true },
    { name: 'No', id: false },
  ];

  constructor(
    private fb: UntypedFormBuilder,
    private hblFB: UntypedFormBuilder
  ) {}

  ngOnInit() {
    //TODO Testing
    let data: BLDetail[] = [
      {
        id: 1,
        vesselName: 'Titanic',
        voyageNo: '1234',
        rotation: 'India',
        ppl: 'Tracking',
        port: 'Loading',
        terminal: 'Mumbai',
        blItems: [
          {
            blid: 1,
            blNumber: '4321',
            isHBL: true,
            hblNumber: '101',
            hblDetail: {
              hblId: 1,
              shipperName: 'NK',
              shipperAddress: 'chennai',
              consigneeName: '123',
              consigneeAddress: 'Bangalore',
              notifyPartyName: '456',
              notifyPartyAddress: 'Coimbatore',
              pol: '1',
              pod: '2',
              containerNo: '789',
              sealNo: '654',
              marksNnumbers: '456',
              description: 'ok',
              grossWeight: 24,
              grosswtDropdowm: 'KG',
            },
            hblView: false,
          },
        ],
      },
    ];
    this.listOfData = data;

    this.blForm = this.fb.group({
      [BLPARAMS.vname]: ['', [Validators.required]],
      [BLPARAMS.voyageNo]: ['', [Validators.required]],
      [BLPARAMS.rotation]: ['', [Validators.required]],
      [BLPARAMS.ppl]: ['', [Validators.required]],
      [BLPARAMS.port]: ['', [Validators.required]],
      [BLPARAMS.terminal]: ['', [Validators.required]],
      blItems: new UntypedFormArray([]),
    });

    this.hblForm = this.hblFB.group({
      [BLPARAMS.shipperName]: ['', [Validators.required]],
      [BLPARAMS.shipperAddress]: ['', [Validators.required]],
      [BLPARAMS.consigneeName]: ['', [Validators.required]],
      [BLPARAMS.consigneeAddress]: ['', [Validators.required]],
      [BLPARAMS.notifyPartyName]: ['', [Validators.required]],
      [BLPARAMS.notifyPartyAddress]: ['', [Validators.required]],
      [BLPARAMS.pol]: ['', [Validators.required]],
      [BLPARAMS.pod]: ['', [Validators.required]],
      [BLPARAMS.containerNo]: ['', [Validators.required]],
      [BLPARAMS.sealNo]: ['', [Validators.required]],
      [BLPARAMS.marksNnumbers]: ['', [Validators.required]],
      [BLPARAMS.description]: ['', [Validators.required]],
      [BLPARAMS.grossWeight]: ['', [Validators.required]],
      [BLPARAMS.grosswtDropdowm]: ['', [Validators.required]],
    });
  }

  createBL(): UntypedFormGroup {
    return this.fb.group({
      [BLPARAMS.blNumber]: ['', [Validators.required]],
      [BLPARAMS.isHBL]: [false],
      [BLPARAMS.hblNumber]: [
        { value: '', disabled: true },
        [Validators.required],
      ],
    });
  }

  blControls(): AbstractControl[] {
    const blArr = this.blForm.get('blItems') as UntypedFormArray;
    return blArr.controls;
  }

  addItem(): void {
    this.blItems = this.blForm.get('blItems') as UntypedFormArray;
    this.blItems.push(this.createBL());
  }

  deleteBL(index: number) {
    this.blItems.removeAt(index);
  }

  open(): void {
    this.visibleBL = true;
  }

  close(): void {
    this.visibleBL = false;
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  blsumbit(item: boolean, index: number) {
    const blArr = this.blForm.get('blItems') as UntypedFormArray;
    if (item === false) {
      blArr.at(index).get([BLPARAMS.hblNumber])?.disable();
      blArr.at(index).get([BLPARAMS.hblNumber])?.reset();
    } else {
      blArr.at(index).get([BLPARAMS.hblNumber])?.enable();
    }
  }

  blSave(): void {
    // console.log('BL Form', JSON.stringify(this.blForm.value));
    let count = this.listOfData.length + 1;
    if (this.blForm.valid) {
      let item = this.blForm.value;
      item.id = count;
      this.listOfData.push(item);
      this.listOfData = [...this.listOfData];
      this.blForm.reset();
      this.blItems.clear();
      this.close();
    }
  }

  hblSave() {
    if (this.hblForm.valid) {
      let hblData = this.hblForm.value;
      if (this.currentBLItem) {
        this.currentBLItem.hblDetail = hblData;
      }
      this.hblForm.reset();
      this.closehbl();
    }
  }


  viewOption(viewItem: BLItem) {
    if (viewItem) {
      viewItem.hblView = !viewItem.hblView;
    }
  }

  editHbl(editElement: BLItem, blForm: BLDetail,isViewMode:boolean=false) {
    this.visibleHbl = true;
    this.currentBLForm = blForm;
    this.currentBLItem = editElement;
    let updatedata = editElement.hblDetail;
    this.hblForm.setValue({
      [BLPARAMS.shipperName]: updatedata?.shipperName,
      [BLPARAMS.shipperAddress]: updatedata?.shipperAddress,
      [BLPARAMS.consigneeName]: updatedata?.consigneeName,
      [BLPARAMS.consigneeAddress]: updatedata?.consigneeAddress,
      [BLPARAMS.notifyPartyName]: updatedata?.notifyPartyName,
      [BLPARAMS.notifyPartyAddress]: updatedata?.notifyPartyAddress,
      [BLPARAMS.pol]: updatedata?.pol,
      [BLPARAMS.pod]: updatedata?.pod,
      [BLPARAMS.containerNo]: updatedata?.containerNo,
      [BLPARAMS.sealNo]: updatedata?.sealNo,
      [BLPARAMS.marksNnumbers]: updatedata?.marksNnumbers,
      [BLPARAMS.description]: updatedata?.description,
      [BLPARAMS.grossWeight]: updatedata?.grossWeight,
      [BLPARAMS.grosswtDropdowm]: updatedata?.grosswtDropdowm,
    });
    if(isViewMode){
      this.hblForm.disable();
    }
  }

  openhbl(blItem: BLItem, blForm: BLDetail) {
    this.currentBLItem = blItem;
    this.currentBLForm = blForm;
    this.visibleHbl = true;
  }


  closehbl() {
    this.visibleHbl = false;
  }

  gridStyle = {
    width: '14.28%',
    textAlign: 'center',
  };
}

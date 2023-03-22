export interface DataItem {
  order?: number;
  id: number;
  projectname: string;
  startdate: Date;
  duedate: Date;
  status: string;
  assign: string;
}

export interface UserDetails {
  username: string;
  call: string;
}

export interface RecentDetails {
  username: string;
  call: string;
  time: string;
}

export interface BLDetail {
  id: number;
  vesselName: string;
  voyageNo: string;
  rotation: string;
  ppl: string;
  port: string;
  terminal: string;
  blItems: BLItem[];
}

export interface BLItem {
  blid: number;
  blNumber: string;
  isHBL: boolean;
  hblNumber: string;
  hblDetail?: HBLDetail;
  hblView: boolean;
}

export interface HBLDetail {
  hblId: number;
  shipperName: string;
  shipperAddress: string;
  consigneeName: string;
  consigneeAddress: string;
  notifyPartyName: string;
  notifyPartyAddress: string;
  pol: string;
  pod: string;
  containerNo: string;
  sealNo: string;
  marksNnumbers: string;
  description: string;
  grossWeight: number;
  grosswtDropdowm: string;
}

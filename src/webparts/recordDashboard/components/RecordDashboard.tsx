import * as React from "react";
import styles from "./RecordDashboard.module.scss";
import { IRecordDashboardProps } from "./IRecordDashboardProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import * as pnp from "sp-pnp-js";
import "./main.css";
import Modal from "./modal";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Tabs, Tab, Modal, Row, Button, Col, Form, Card, Container } from "react-bootstrap";
import "jquery";
require("bootstrap");

import "react-tabs/style/react-tabs.css";
import ModalEditRecord from "./modal-edit-record";
import { SPOperations } from "../Services/SPServices";
//import { useForm } from "react-hook-form";

export interface TableItems {
  physicalLoctionListTiltle: any[];
  buildingListTitle: any[];
  roomlistTitle: any[];
  shelflistTitle: any[];
  boxfileTitle: any[];
  selectedvalue: String;
  buldingdivcontainer: boolean;
  disableaddlocation: boolean;
  roomcontainer: boolean;
  shelfcontainer: boolean;
  boxfilecontainer: boolean;
  filecontainer: boolean;
  stratfrombuilding: boolean;
  buildingId: String;
  buildingname: String;
  createdDate: any;
  cratedby: String;
  updateDate: any;
  updatedby: String;
  roomname: String;
  roomid: String;
  shelfid: String;
  shelfname: String;
  selectedroomid: String;
  boxfileid: String;
  boxfilename: String;
  selectedshelfid: String;
  fileid: String;
  filename: String;
  selectedbosfileid: String;
  buildingnameError: String;
  buildingidError: String;
  roomnameError: String;
  roomidError: String;
  shelfnameError: String;
  shelfidError: String;
  roomidforshelfError: String;
  boxfilenameError: String;
  boxfileidError: String;
  roomidforboxfileError: String;
  filenameError: String;
  fileidError: String;
  roomidforfileError: String;
  boxfileidforfileError: String;
}

export default class RecordDashboard extends React.Component<
  IRecordDashboardProps,
  TableItems,
  {}
> {
  // public htmlData=``;
  public _spOps: SPOperations;
  public data: object;
  public selctedlocation: String;
  public buildingidforroom: String;
  public roomidforshelf: String;
  public shelfidforboxfile: String;
  public boxfileforfile: String;
  public intilBuildingvalues: { BuildgingId: ""; BuildgingName: "" };

  public constructor(props: IRecordDashboardProps) {
    super(props);
    this._spOps = new SPOperations();
    this.state = {
      physicalLoctionListTiltle: [],
      buildingListTitle: [],
      roomlistTitle: [],
      shelflistTitle: [],
      boxfileTitle: [],
      selectedvalue: "",
      buldingdivcontainer: false,
      disableaddlocation: false,
      roomcontainer: false,
      shelfcontainer: false,
      boxfilecontainer: false,
      filecontainer: false,
      stratfrombuilding: false,
      buildingId: "",
      buildingname: "",
      createdDate: null,
      cratedby: "",
      updateDate: null,
      updatedby: "",
      roomname: "",
      roomid: "",
      shelfid: "",
      shelfname: "",
      selectedroomid: "",
      boxfileid: "",
      boxfilename: "",
      selectedshelfid: "",
      fileid: "",
      filename: "",
      selectedbosfileid: "",
      buildingnameError: "",
      buildingidError: "",
      roomnameError: "",
      roomidError: "",
      shelfnameError: "",
      shelfidError: "",
      roomidforshelfError: "",
      boxfilenameError: "",
      boxfileidError: "",
      roomidforboxfileError: "",
      filenameError: "",
      fileidError: "",
      roomidforfileError: "",
      boxfileidforfileError: "",
    };
  }
  public componentDidMount() {
    this._spOps.GetAllList(this.props.context).then((result: any[]) => {
      this.setState({ physicalLoctionListTiltle: result });
    });
    // this._spOps.GetBuilding(this.props.context).then((result: any[]) => {
    //   this.setState({ buildingListTitle: result });
    // });
    // this._spOps
    //   .Getrooms(this.props.context, this.state.selectedroomid)
    //   .then((result: any[]) => {
    //     this.setState({ roomlistTitle: result });
    //   });
  }

  public onChangebuildingname = (e) => {
    this.setState({
      buildingname: e.target.value,
    });
  };
  public onChangebuildingID = (e) => {
    this.setState({
      buildingId: e.target.value,
    });
  };
  public onChangecrateddate = (event, value: string) => {
    this.setState({
      createdDate: value,
    });
  };
  public onChangecratedby = (event, value: string) => {
    this.setState({
      cratedby: value,
    });
  };
  public onChangeupdatedby = (event, value: string) => {
    this.setState({
      updatedby: value,
    });
  };
  public onChangeupdatedate = (event, value: string) => {
    this.setState({
      updateDate: value,
    });
  };
  public onChangeroomname = (e) => {
    this.setState({
      roomname: e.target.value,
    });
  };
  public onChangeroomid = (e) => {
    this.setState({
      roomid: e.target.value,
    });
  };
  public onChangeshelfname = (e) => {
    this.setState({
      shelfname: e.target.value,
    });
  };
  public onChangeshelfid = (e) => {
    this.setState({
      shelfid: e.target.value,
    });
  };
  public onChangeboxfilename = (e) => {
    this.setState({
      boxfilename: e.target.value,
    });
  };
  public onChangeboxfileid = (e) => {
    this.setState({
      boxfileid: e.target.value,
    });
  };
  public onChangefilename = (e) => {
    this.setState({
      filename: e.target.value,
    });
  };
  public onChangefileid = (e) => {
    this.setState({
      fileid: e.target.value,
    });
  };

  public handlechange = (e) => {
    // this.setState({disablelocation:true});

    if (this.selctedlocation == "Building") {
      this.setState({ buldingdivcontainer: !this.state.buldingdivcontainer });
      this.setState({ disableaddlocation: !this.state.disableaddlocation });

      // this.selectbuilding(e);
      this.setState({ roomcontainer: false });
      this.setState({ shelfcontainer: false });
      this.setState({ boxfilecontainer: false });
      this.setState({ filecontainer: false });
      // this.setState({ selectedvalue: "" });
    } else if (this.selctedlocation == "Rooms") {
      this.setState({ roomcontainer: !this.state.roomcontainer });
      this.setState({ disableaddlocation: !this.state.disableaddlocation });
      this.setState({ buldingdivcontainer: false });
      this.setState({ shelfcontainer: false });
      this.setState({ boxfilecontainer: false });
      this.setState({ filecontainer: false });
      // this.setState({ selectedvalue: "" });
    } else if (this.selctedlocation == "Shelf") {
      this.setState({ shelfcontainer: !this.state.shelfcontainer });
      this.setState({ disableaddlocation: !this.state.disableaddlocation });
      this.setState({ buldingdivcontainer: false });
      this.setState({ roomcontainer: false });
      this.setState({ boxfilecontainer: false });
      this.setState({ filecontainer: false });
      //this.setState({ selectedvalue: "" });
    } else if (this.selctedlocation == "BoxFile") {
      this.setState({ boxfilecontainer: !this.state.boxfilecontainer });
      this.setState({ disableaddlocation: !this.state.disableaddlocation });
      this.setState({ buldingdivcontainer: false });
      this.setState({ roomcontainer: false });
      this.setState({ shelfcontainer: false });
      this.setState({ filecontainer: false });
      // this.setState({ selectedvalue: "" });
    } else if (this.selctedlocation == "File") {
      this.setState({ filecontainer: !this.state.filecontainer });
      this.setState({ disableaddlocation: !this.state.disableaddlocation });
      this.setState({ buldingdivcontainer: false });
      this.setState({ roomcontainer: false });
      this.setState({ shelfcontainer: false });
      this.setState({ boxfilecontainer: false });
      // this.setState({ selectedvalue: "" });
    }
  };
  public handlechangebuilding = (e) => {
    // this.setState({disablelocation:true});
    const isValid: any = this.validate();

    //if(this.state.selectedvalue=="Bulding"){
    if (isValid) {
      this.setState({ buldingdivcontainer: !this.state.buldingdivcontainer });
      // this.setState({ stratfrombuilding: !this.state.stratfrombuilding });
      // this.setState({buldingdivcontainer:!this.state.buldingdivcontainer});

      // this.setState({ roomcontainer: !this.state.roomcontainer });
      this.setState({ disableaddlocation: !this.state.disableaddlocation });
      // this.setState({ selectedvalue: "Building" });
      this.submitbuilding(e);
      // this.selectbuilding(e);
    }

    // }
  };
  public handlechangeroom = (e) => {
    // this.setState({disablelocation:true});

    //if(this.state.selectedvalue=="Bulding"){

    // this.setState({buldingdivcontainer:!this.state.buldingdivcontainer});
    //this.setState({roomcontainer:!this.state.roomcontainer});

    // if (this.state.stratfrombuilding == true) {
    //   this.setState({ shelfcontainer: !this.state.shelfcontainer });

    // this.setState({buldingdivcontainer:!this.state.buldingdivcontainer});
    //  this.setState({stratfrombuilding:!this.state.stratfrombuilding})
    // } else {
    const isValid: any = this.validateroom();

    //if(this.state.selectedvalue=="Bulding"){
    if (isValid) {
      this.setState({ roomcontainer: !this.state.roomcontainer });
      this.setState({ disableaddlocation: !this.state.disableaddlocation });
      // this.setState({ selectedvalue: "Rooms" });
      this.submitroom(e);
    }

    // }
  };
  public handlechangeshelf = (e) => {
    // this.setState({disablelocation:true});

    //if(this.state.selectedvalue=="Bulding"){

    // this.setState({buldingdivcontainer:!this.state.buldingdivcontainer});

    // if (this.state.stratfrombuilding == true) {
    //   this.setState({ boxfilecontainer: !this.state.boxfilecontainer });

    // this.setState({buldingdivcontainer:!this.state.buldingdivcontainer});
    // this.setState({roomcontainer:!this.state.roomcontainer});

    // this.setState({stratfrombuilding:!this.state.stratfrombuilding})
    // } else {
    const isValid: any = this.validateshelf();
    if (isValid) {
      this.setState({ shelfcontainer: !this.state.shelfcontainer });
      this.setState({ disableaddlocation: !this.state.disableaddlocation });
      this.submitshelf(e);
    }

    // }
  };
  public handlechangeboxfile = (e) => {
    // this.setState({disablelocation:true});

    //if(this.state.selectedvalue=="Bulding"){

    // this.setState({buldingdivcontainer:!this.state.buldingdivcontainer});

    // if (this.state.stratfrombuilding == true) {
    //   this.setState({ filecontainer: !this.state.filecontainer });
    // } else {

    const isValid: any = this.validatboxfile();
    if (isValid) {
      this.setState({ boxfilecontainer: !this.state.boxfilecontainer });
      this.setState({ disableaddlocation: !this.state.disableaddlocation });
      this.submitboxfile(e);
    }

    // }
  };
  public handlechangefile = (e) => {
    // this.setState({disablelocation:true});

    //if(this.state.selectedvalue=="Bulding"){

    // this.setState({buldingdivcontainer:!this.state.buldingdivcontainer});

    // if (this.state.stratfrombuilding == true) {
    //   this.setState({ buldingdivcontainer: !this.state.buldingdivcontainer });
    //   this.setState({ roomcontainer: !this.state.roomcontainer });
    //   this.setState({ shelfcontainer: !this.state.shelfcontainer });
    //   this.setState({ boxfilecontainer: !this.state.boxfilecontainer });

    //   this.setState({ stratfrombuilding: !this.state.stratfrombuilding });
    //   this.setState({ filecontainer: !this.state.filecontainer });
    //   this.setState({ disableaddlocation: !this.state.disableaddlocation });
    //   this.submitbuilding(e);
    // } else {
    const isValid: any = this.validatfile();
    if (isValid) {
      this.setState({ filecontainer: !this.state.filecontainer });
      this.setState({ disableaddlocation: !this.state.disableaddlocation });
      this.submitfile(e);
    }

    // }
  };
  public validate = () => {
    let buildingnameError = "";
    let buildingidError = "";

    if (!this.state.buildingname) {
      buildingidError = "Building Name is Required";
    }
    if (!this.state.buildingId) {
      buildingidError = "Building ID is Required";
    }

    if (buildingnameError || buildingidError) {
      this.setState({ buildingnameError, buildingidError });
      return false;
    }

    return true;
  };
  validateroom = () => {
    let roomnameError = "";
    let roomidError = "";
    if (!this.state.roomname) {
      roomnameError = "Room name is Required";
    }
    if (!this.state.roomid) {
      roomidError = "Room ID is Required";
    }
    if (roomnameError || roomidError) {
      this.setState({ roomnameError, roomidError });
      return false;
    }
    return true;
  };
  validateshelf = () => {
    let shelfnameError = "";
    let shelfidError = "";
    let roomidforshelfError = "";
    if (!this.state.shelfname) {
      shelfnameError = "Shelf name is Required";
    }
    if (!this.state.shelfid) {
      shelfidError = "Shelf ID is Required";
    }
    if (!this.roomidforshelf) {
      roomidforshelfError = " Room is  is Required";
    }
    // let selectstring = "Open this select menu";
    // if (this.state.selectedroomid.trim() === selectstring.trim()) {
    //   // roomidforshelfError = " Room is  is Required";
    //   console.log(
    //     "this.state.selectedroomid.trim()" + this.state.selectedroomid.trim()
    //   );
    // }

    if (shelfnameError || shelfidError || roomidforshelfError) {
      this.setState({ shelfnameError, shelfidError, roomidforshelfError });
      return false;
    }

    return true;
  };
  validatboxfile = () => {
    let boxfilenameError = "";
    let boxfileidError = "";
    let roomidforboxfileError = "";

    if (!this.state.boxfilename) {
      boxfilenameError = "BoxFile name is Required";
    }
    if (!this.state.boxfileid) {
      boxfileidError = "BoxFile ID is Required";
    }

    if (!this.state.selectedshelfid) {
      roomidforboxfileError = " Room is  is Required";
    }
    // let selectstring = "Open this select menu";
    // if (this.state.selectedroomid.trim() === selectstring.trim()) {
    //   // roomidforshelfError = " Room is  is Required";
    //   console.log(
    //     "this.state.selectedroomid.trim()" + this.state.selectedroomid.trim()
    //   );
    // }

    if (boxfilenameError || boxfileidError || roomidforboxfileError) {
      this.setState({
        boxfilenameError,
        boxfileidError,
        roomidforboxfileError,
      });
      return false;
    }

    return true;
  };
  validatfile = () => {
    let filenameError = "";
    let fileidError = "";
    let roomidforfileError = "";
    let boxfileidforfileError = "";

    if (!this.state.filename) {
      filenameError = "File name is Required";
    }
    if (!this.state.fileid) {
      fileidError = "File ID is Required";
    }
    if (!this.state.selectedshelfid) {
      roomidforfileError = " Room is  is Required";
    }
    if (!this.boxfileforfile) {
      boxfileidforfileError = " BoxFile is  is Required";
    }
    // let selectstring = "Open this select menu";
    // if (this.state.selectedroomid.trim() === selectstring.trim()) {
    //   // roomidforshelfError = " Room is  is Required";
    //   console.log(
    //     "this.state.selectedroomid.trim()" + this.state.selectedroomid.trim()
    //   );
    // }

    if (
      filenameError ||
      fileidError ||
      roomidforfileError ||
      boxfileidforfileError
    ) {
      this.setState({
        filenameError,
        fileidError,
        roomidforfileError,
        boxfileidforfileError,
      });
      return false;
    }

    return true;
  };

  public submitbuilding(e) {
    e.preventDefault();

    const isValid: any = this.validate();

    const datanew: object = {
      Title: this.state.buildingname,
      BuldingId: this.state.buildingId,
      BuildingName: this.state.buildingname,
      createddate: this.state.createdDate,
      createdby: this.state.cratedby,
      updateddate: this.state.updateDate,
      updatedby: this.state.updatedby,
    };
    this.data = datanew;
    if (isValid) {
      this._spOps
        .Createbuilding(this.props.context, this.data)
        .then((result: string) => {
          //   this.setState({status:result});
          this.data = {};
        });
      console.log(this.state.boxfilename, this.state.buildingId);
      this.setState({ buildingId: "" });
      this.setState({ buildingname: "" });
      this.setState({ buildingidError: "" });
      this.setState({ buildingnameError: "" });
    }

    //             }
  }
  public submitroom(e) {
    e.preventDefault();

    const isValid: any = this.validateroom();
    console.log("selected" + this.state.selectedvalue);
    const datanew: object = {
      Title: this.state.roomname,
      // BuldingId: this.state.selectedvalue,
      BuldingId: this.buildingidforroom,
      RoomId: this.state.roomid,
      RoomName: this.state.roomname,
    };
    this.data = datanew;

    if (isValid) {
      this._spOps
        .Createroom(this.props.context, this.data)
        .then((result: string) => {
          this.data = {};
          //   this.setState({status:result});
        });
      console.log(this.state.boxfilename, this.state.buildingId);
      this.setState({ roomid: "" });
      this.setState({ roomname: "" });
      this.setState({ roomidError: "" });
      this.setState({ roomnameError: "" });
    }

    //             }
  }
  public submitshelf(e) {
    e.preventDefault();

    const isValid: any = this.validateshelf();
    console.log("selected" + this.state.selectedvalue);
    const datanew: object = {
      Title: this.state.shelfname,
      RoomId: this.roomidforshelf,
      ShelfId: this.state.shelfid,
      ShelfName: this.state.shelfname,
    };
    this.data = datanew;
    if (isValid) {
      console.log("selected room" + this.state.selectedroomid);
      this._spOps
        .Creatshelf(this.props.context, this.data)
        .then((result: string) => {
          this.data = {};
          //   this.setState({status:result});
        });
      this.setState({ shelfid: "" });
      this.setState({ shelfname: "" });
      this.setState({ shelfidError: "" });
      this.setState({ shelfnameError: "" });
      this.roomidforshelf = "";
    }

    //             }
  }
  public submitboxfile(e) {
    e.preventDefault();

    const isValid: any = this.validatboxfile();
    console.log("selected" + this.state.selectedvalue);
    const datanew: object = {
      Title: this.state.boxfilename,
      ShelfId: this.shelfidforboxfile,
      BoxFileId: this.state.boxfileid,
      BoxFileName: this.state.boxfilename,
    };
    this.data = datanew;
    if (isValid) {
      this._spOps
        .Creatboxfile(this.props.context, this.data)
        .then((result: string) => {
          this.data = {};
          //   this.setState({status:result});
        });
      console.log(this.state.boxfilename, this.state.buildingId);
      this.setState({ boxfileid: "" });
      this.setState({ boxfilename: "" });
      this.setState({ boxfileidError: "" });
      this.setState({ boxfilenameError: "" });
      this.setState({ selectedshelfid: "" });
    }
    //             }
  }
  public submitfile(e) {
    e.preventDefault();

    const isValid: any = this.validatfile();
    console.log("selected" + this.state.selectedvalue);
    const datanew: object = {
      Title: this.state.filename,
      BoxFileId: this.boxfileforfile,
      FileId: this.state.fileid,
      FileName: this.state.filename,
    };
    this.data = datanew;
    if (isValid) {
      this._spOps
        .Creatfile(this.props.context, this.data)
        .then((result: string) => {
          this.data = {};
          //   this.setState({status:result});
        });
      this.setState({ fileid: "" });
      this.setState({ filename: "" });
      this.setState({ fileidError: "" });
      this.setState({ filenameError: "" });
      this.setState({ selectedshelfid: "" });
      this.boxfileforfile = "";
    }

    // }            }
  }
  public selectbuilding(e) {
    console.log("reached here", e.target.value);
    // this.setState({ selectedvalue: e.target.value });

    this._spOps.GetBuilding(this.props.context).then((result: any[]) => {
      this.setState({ buildingListTitle: result });
    });
  }

  public selectroomforshelf(e) {
    console.log("reached here", e.target.value);
    // this.roomidforshelf = e.target.value;
    this.setState({ selectedroomid: e.target.value });
    //  console.log("insideshelfselected");
    this._spOps.Getrooms(this.props.context, e.target.value).then((result) => {
      console.log(result);
      this.setState({ roomlistTitle: result });
    });
  }
  public selectshelfforboxfile(e) {
    let selectstring = "Open this select menu";
    let select = " Open this select menu";
    if (selectstring.trim() === e.target.value.trim()) {
      console.log("select menu called");
      console.log("trimmed" + e.target.value.trim());
      this.setState({ selectedshelfid: "" });
      // this.setState({ selectedroomid: "" });
    } else {
      console.log("reached here", e.target.value);
      //this.shelfidforboxfile = e.target.value;
      this.setState({ selectedshelfid: e.target.value });
      //  console.log("insideshelfselected");
      this._spOps
        .Getshelfs(this.props.context, e.target.value)
        .then((result) => {
          console.log(result);
          this.setState({ shelflistTitle: result });
        });
    }
  }
  public selectboxfileforfile(e) {
    console.log("reached here", e.target.value);
    // this.boxfileforfile = e.target.value;
    this.setState({ selectedbosfileid: e.target.value });
    //  console.log("insideshelfselected");
    this._spOps
      .Getboxfiles(this.props.context, e.target.value)
      .then((result) => {
        console.log(result);
        this.setState({ boxfileTitle: result });
      });
  }

  newstate = "";

  mycontry = {
    myarry: ["Bulding", "Room", "Shelf", "Boxfile", "File"],
  };
  building = {
    buildings: ["Bulding1", "Bulding2", "Bulding3", "Bulding4"],
  };
  room = {
    rooms: ["Room1", "Room2", "Room3", "Room4"],
  };
  shelf = {
    shelfs: ["Shelf1", "Shelf2", "Shelf3", "Shelf4"],
  };
  boxfile = {
    boxfiles: ["BoxFile1", "BoxFile2", "BoxFile3", "BoxFile4"],
  };
  selected(e) {
    // this.newstate=e.target.value.tostring();
    console.log();
    this.selctedlocation = e.target.value;

    this.setState({ selectedvalue: e.target.value });
    let select = " Open this select menu";
    let selectstring = "Building";
    // if (selectstring.trim() === e.target.value.trim()) {
    //   this.selectbuilding(e);
    // }
    this._spOps.GetBuilding(this.props.context).then((result: any[]) => {
      this.setState({ buildingListTitle: result });
    });

    this.handlechange(e);

    //
  }
  selectedbuilding(e) {
    // this.newstate=e.target.value.tostring();

    //  this.setState({ selectedvalue: e.target.value });
    this.buildingidforroom = e.target.value;

    //
  }
  selectedroom(e) {
    // this.newstate=e.target.value.tostring();
    // this.roomidforshelf = e.target.value;

    let selectstring = "Open this select menu";
    let select = " Open this select menu";
    if (selectstring.trim() === e.target.value.trim()) {
      console.log("select menu called");
      console.log("trimmed" + e.target.value.trim());
      this.roomidforshelf = "";
      // this.setState({ selectedroomid: "" });
    } else {
      console.log(e.target.value);
      // this.setState({ selectedroomid: e.target.value });
      console.log("calledseletedroom");
      this.roomidforshelf = e.target.value;
    }

    //
  }
  selecteshelf(e) {
    // this.newstate=e.target.value.tostring();
    this.shelfidforboxfile = e.target.value;
    //
  }
  selectboxfile(e) {
    let selectstring = "Open this select menu";
    let select = " Open this select menu";
    if (selectstring.trim() === e.target.value.trim()) {
      console.log("select menu called");
      console.log("trimmed" + e.target.value.trim());
      this.boxfileforfile = "";
      // this.setState({ selectedroomid: "" });
    } else {
      // this.newstate=e.target.value.tostring();
      this.boxfileforfile = e.target.value;
    }
    //
  }
  disableaddlocation() {
    this.setState({
      disableaddlocation: false,
    });
  }
  //onSubmit = (data) => console.log("submiteddata" + data);
  // handlebuildingsubmit =event=>{
  //   event.preventDefault();
  //   console.log(this.state.boxfilename,this.state.buildingId);

  // }

  public render(): React.ReactElement<IRecordDashboardProps> {
    console.log(this.state.physicalLoctionListTiltle);
    console.log(this.state.buildingListTitle);

    let cssURL =
      "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
    SPComponentLoader.loadCss(cssURL);
    SPComponentLoader.loadCss(
      "https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
    );
    //const { register, handleSubmit, errors } = useForm();

    return (
      <>
        <div>
          {/* <div className="dropdown">
  <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    Add Location
    <span className="caret"></span>
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
    {this.mycontry.myarry.map(data=>(
     
      <li><a href="#">{data}</a></li>

    ))}
    
   
  </ul>
</div> */}
          <form
          // onSubmit={handleSubmit(this.onSubmit)}
          >
            <div className="form-group">
              <label>Select Location</label>
              <select
                className="form-control"
                aria-label="Default select example"
                id="dropdown"
                onChange={(e) => this.selected(e)}
              >
                <option selected>Open this select menu</option>
                {/* {this.mycontry.myarry.map(data=>( 
      <option value={data}>{data}</option>
     

    ))} */}
                {this.state.physicalLoctionListTiltle.map((data) => {
                  return (
                    <>
                      <option value={data.key}>{data.value}</option>

                      {/* <label>{data.value}</label> */}
                    </>
                  );
                })}
              </select>
            </div>
            {/* <button
              type="button"
              className="btn btn-primary"
              onClick={this.handlechange}
              disabled={this.state.disableaddlocation}
            >
              Add Location
            </button> */}
          </form>
        </div>
        {this.state.buldingdivcontainer && (
          <form>
            <div className="form-group ">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Buildging Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail3"
                    placeholder="Buildging Name"
                    //   {...(register("BuildgingName"), { required: true })}
                    onChange={(e) => this.onChangebuildingname(e)}
                  />
                  <div color="red">{this.state.buildingnameError}</div>
                  {/* {errors?.BuildgingName && <p>Buildging Name is required.</p>} */}
                </div>
              </div>
            </div>
            <div className="form-group ">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Buildging Id</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword3"
                    placeholder="Buildging Id"
                    // {...register("BuildgingId", { required: true })}
                    onChange={(e) => this.onChangebuildingID(e)}
                  />
                  <div color="red">{this.state.buildingidError}</div>

                  {/* {errors?.BuildgingId && <p>Buildging Id is required.</p>} */}
                </div>
              </div>
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handlechangebuilding}
              >
                Add Building
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  this.setState({
                    buldingdivcontainer: !this.state.buldingdivcontainer,
                  });
                  this.setState({
                    disableaddlocation: !this.state.disableaddlocation,
                  });
                  // this.setState({ selectedvalue: "Building" });
                  this.setState({ buildingidError: "" });
                  this.setState({ buildingnameError: "" });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {this.state.roomcontainer && (
          <form>
            {this.state.stratfrombuilding || (
              <div className="form-group">
                <label>Select building</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  id="dropdown"
                  onChange={(e) => this.selectedbuilding(e)}
                >
                  <option selected>Open this select menu</option>
                  {/* {this.building.buildings.map(data=>( 
      <option value={data}>{data}</option>

    ))} */}
                  {this.state.buildingListTitle.map((data) => {
                    return (
                      <>
                        <option value={data.BuldingId}>
                          {data.BuildingName}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            )}

            <div className="form-group">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Room Name</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail3"
                    placeholder="Room Name"
                    onChange={(e) => this.onChangeroomname(e)}
                  />
                  <div>{this.state.roomnameError}</div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Room Id</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword3"
                    placeholder="Room Id"
                    onChange={(e) => this.onChangeroomid(e)}
                  />
                  <div>{this.state.roomidError}</div>
                </div>
              </div>
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handlechangeroom}
              >
                Add Room
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  this.setState({ roomcontainer: !this.state.roomcontainer });
                  this.setState({
                    disableaddlocation: !this.state.disableaddlocation,
                  });
                  // this.setState({ selectedvalue: "Rooms" });
                  this.setState({ roomidError: "" });
                  this.setState({ roomnameError: "" });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {this.state.shelfcontainer && (
          <form>
            {this.state.stratfrombuilding || (
              <div className="form-group">
                <label>Select building</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  id="dropdown"
                  onChange={(e) => this.selectroomforshelf(e)}
                >
                  <option selected>Open this select menu</option>
                  {/* {this.building.buildings.map(data=>( 
      <option value={data}>{data}</option>

    ))} */}
                  {/* {this.building.buildings.map(data=>( 
      <option value={data}>{data}</option>

    ))} */}
                  {this.state.buildingListTitle.map((data) => {
                    return (
                      <>
                        <option value={data.BuldingId}>
                          {data.BuildingName}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            )}

            {this.state.stratfrombuilding || (
              <div className="form-group">
                <label>Select room</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  id="dropdown"
                  onChange={(e) => this.selectedroom(e)}
                >
                  <option selected>Open this select menu</option>
                  {/* {this.room.rooms.map(data=>( 
      <option value={data}>{data}</option>

    ))} */}
                  {/* {this.building.buildings.map(data=>( 
      <option value={data}>{data}</option>

    ))} */}
                  {this.state.roomlistTitle.map((data) => {
                    return (
                      <>
                        <option value={data.RoomId}>{data.RoomName}</option>
                      </>
                    );
                  })}
                </select>
                <div>{this.state.roomidforshelfError}</div>
              </div>
            )}

            <div className="form-group">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Shelf Name</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail3"
                    placeholder="Shelf Name"
                    onChange={(e) => this.onChangeshelfname(e)}
                  />
                  <div>{this.state.shelfnameError}</div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Shelf Id</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword3"
                    placeholder="Shelf Id"
                    onChange={(e) => this.onChangeshelfid(e)}
                  />
                  <div>{this.state.shelfidError}</div>
                </div>
              </div>
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handlechangeshelf}
              >
                Add shelf
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  this.setState({ shelfcontainer: !this.state.shelfcontainer });
                  this.setState({
                    disableaddlocation: !this.state.disableaddlocation,
                  });
                  this.setState({ shelfnameError: "" });
                  this.setState({ shelfidError: "" });
                  this.setState({ roomidforshelfError: "" });
                  this.roomidforshelf = "";
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {this.state.boxfilecontainer && (
          <form>
            {this.state.stratfrombuilding || (
              <div className="form-group">
                <label>Select building</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  id="dropdown"
                  // onChange={(e) => this.selected(e)}
                  onChange={(e) => this.selectroomforshelf(e)}
                >
                  <option selected>Open this select menu</option>
                  {/* {this.building.buildings.map((data) => (
                    <option value={data}>{data}</option>
                  ))} */}

                  {this.state.buildingListTitle.map((data) => {
                    return (
                      <>
                        <option value={data.BuldingId}>
                          {data.BuildingName}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            )}

            {this.state.stratfrombuilding || (
              <div className="form-group">
                <label>Select room</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  id="dropdown"
                  // onChange={(e) => this.selected(e)}
                  onChange={(e) => this.selectshelfforboxfile(e)}
                >
                  <option selected>Open this select menu</option>
                  {/* {this.room.rooms.map((data) => (
                    <option value={data}>{data}</option>
                  ))} */}

                  {this.state.roomlistTitle.map((data) => {
                    return (
                      <>
                        <option value={data.RoomId}>{data.RoomName}</option>
                      </>
                    );
                  })}
                </select>
                <div>{this.state.roomidforboxfileError}</div>
              </div>
            )}

            {this.state.stratfrombuilding || (
              <div className="form-group">
                <label>Select shelf</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  id="dropdown"
                  onChange={(e) => this.selecteshelf(e)}
                >
                  <option selected>Open this select menu</option>
                  {/* {this.shelf.shelfs.map((data) => (
                    <option value={data}>{data}</option>
                  ))} */}
                  {this.state.shelflistTitle.map((data) => {
                    return (
                      <>
                        <option value={data.ShelfId}>{data.ShelfName}</option>
                      </>
                    );
                  })}
                </select>
              </div>
            )}

            <div className="form-group">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">BoxFile Name</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail3"
                    placeholder="BoxFile Name"
                    onChange={(e) => this.onChangeboxfilename(e)}
                  />
                  <div>{this.state.boxfilenameError}</div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">BoxFile Id</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword3"
                    placeholder="BoxFile Id"
                    onChange={(e) => this.onChangeboxfileid(e)}
                  />
                  <div>{this.state.boxfileidError}</div>
                </div>
              </div>
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handlechangeboxfile}
              >
                Add BoxFile
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  this.setState({
                    boxfilecontainer: !this.state.boxfilecontainer,
                  });
                  this.setState({
                    disableaddlocation: !this.state.disableaddlocation,
                  });
                  this.setState({ boxfileidError: "" });
                  this.setState({ boxfilenameError: "" });
                  this.setState({ selectedshelfid: "" });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {this.state.filecontainer && (
          <form>
            {this.state.stratfrombuilding || (
              <div className="form-group">
                <label>Select building</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  id="dropdown"
                  // onChange={(e) => this.selected(e)}
                  onChange={(e) => this.selectroomforshelf(e)}
                >
                  <option selected>Open this select menu</option>
                  {/* {this.building.buildings.map((data) => (
                    <option value={data}>{data}</option>
                  ))} */}
                  {this.state.buildingListTitle.map((data) => {
                    return (
                      <>
                        <option value={data.BuldingId}>
                          {data.BuildingName}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            )}
            {this.state.stratfrombuilding || (
              <div className="form-group">
                <label>Select room</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  id="dropdown"
                  // onChange={(e) => this.selected(e)}
                  onChange={(e) => this.selectshelfforboxfile(e)}
                >
                  <option selected>Open this select menu</option>
                  {/* {this.room.rooms.map((data) => (
                    <option value={data}>{data}</option>
                  ))} */}
                  {this.state.roomlistTitle.map((data) => {
                    return (
                      <>
                        <option value={data.RoomId}>{data.RoomName}</option>
                      </>
                    );
                  })}
                </select>
                <div>{this.state.roomidforfileError}</div>
              </div>
            )}
            {this.state.stratfrombuilding || (
              <div className="form-group">
                <label>Select shelf</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  id="dropdown"
                  // onChange={(e) => this.selected(e)}
                  onChange={(e) => this.selectboxfileforfile(e)}
                >
                  <option selected>Open this select menu</option>
                  {/* {this.shelf.shelfs.map((data) => (
                    <option value={data}>{data}</option>
                  ))} */}
                  {this.state.shelflistTitle.map((data) => {
                    return (
                      <>
                        <option value={data.ShelfId}>{data.ShelfName}</option>
                      </>
                    );
                  })}
                </select>
              </div>
            )}
            {this.state.stratfrombuilding || (
              <div className="form-group">
                <label>Select Boxfile</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  id="dropdown"
                  onChange={(e) => this.selectboxfile(e)}
                >
                  <option selected>Open this select menu</option>
                  {/* {this.boxfile.boxfiles.map((data) => (
                    <option value={data}>{data}</option>
                  ))} */}
                  {this.state.boxfileTitle.map((data) => {
                    return (
                      <>
                        <option value={data.BoxFileId}>
                          {data.BoxFileName}
                        </option>
                      </>
                    );
                  })}
                </select>
                <div>{this.state.boxfileidforfileError}</div>
              </div>
            )}

            <div className="form-group">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">File Name</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail3"
                    placeholder="File Name"
                    onChange={(e) => this.onChangefilename(e)}
                  />
                  <div>{this.state.filenameError}</div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">File Id</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword3"
                    placeholder="File Id"
                    onChange={(e) => this.onChangefileid(e)}
                  />
                  <div>{this.state.fileidError}</div>
                </div>
              </div>
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handlechangefile}
              >
                Add File
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  this.setState({ filecontainer: !this.state.filecontainer });
                  this.setState({
                    disableaddlocation: !this.state.disableaddlocation,
                  });
                  this.setState({ fileidError: "" });
                  this.setState({ filenameError: "" });
                  this.setState({ selectedshelfid: "" });
                  this.boxfileforfile = "";
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </>
    );
  }
}

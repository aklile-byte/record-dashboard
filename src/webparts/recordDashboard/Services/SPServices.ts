import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions,
} from "@microsoft/sp-http";
import { IDropdownOption } from "office-ui-fabric-react";

export class SPOperations {
  public GetAllList(context: WebPartContext): Promise<any[]> {
    let locationUrl: string =
      context.pageContext.web.absoluteUrl +
      "/sites/demo/physicalLocation/_api/web/lists?select=Title";
    //let locationUrl:string=context.pageContext.web.absoluteUrl+"/sites/demo/physicalLocation/_api/web/lists/getbytitle('Building')/items";
    var locationTitle: any[] = [];
    return new Promise<any[]>(async (resolve, reject) => {
      context.spHttpClient
        .get(locationUrl, SPHttpClient.configurations.v1)
        .then(
          (response: SPHttpClientResponse) => {
            response.json().then((results: any) => {
              results.value.map((result: any) => {
                locationTitle.push({ key: result.Title, value: result.Title });
              });
            });
            resolve(locationTitle);
          },
          (error: any): void => {
            reject("error occured" + error);
          }
        );
    });
  }
  // public GetBuilding(context: WebPartContext): Promise<any[]> {
  //   // let locationUrl:string=context.pageContext.web.absoluteUrl+"/sites/demo/physicalLocation/_api/web/getByTitle('Building')/items";
  //   let locationUrl: string =
  //     context.pageContext.web.absoluteUrl +
  //     "/sites/demo/physicalLocation/_api/web/lists/getbytitle('Building')/items";

  //   //let resturl:string=context.
  //   var locationTitle: any[] = [];

  //   return new Promise<any[]>(async (resolve, reject) => {
  //     context.spHttpClient
  //       .get(locationUrl, SPHttpClient.configurations.v1)
  //       .then(
  //         (response: SPHttpClientResponse) => {
  //           response.json().then((results: any) => {
  //             console.log(results);
  //             results.value.map((result: any) => {
  //               console.log("insinegetbuilding");
  //               console.log(result.Title);
  //               console.log(result.BuldingId);

  //               locationTitle.push({
  //                 key: result.BuldingId,
  //                 value: result.BuildingName,
  //               });
  //             });
  //           });
  //           resolve(locationTitle);
  //           console.log(locationTitle);
  //         },
  //         (error: any): void => {
  //           reject("error occured" + error);
  //         }
  //       );
  //   });
  // }
  public GetBuilding(context: WebPartContext): Promise<any[]> {
    console.log("roomid");
    //
    // "/sites/demo/physicalLocation/_api/web/lists/getbytitle('Rooms')/items?$filter[BuldingId] eq(" +//

    // let locationUrl:string=context.pageContext.web.absoluteUrl+"/sites/demo/physicalLocation/_api/web/getByTitle('Building')/items";
    let locationUrl: string =
      context.pageContext.web.absoluteUrl +
      "/sites/demo/physicalLocation/_api/web/lists/getbytitle('Building')/items";

    //let resturl:string=context.
    var locationTitle: any[] = [];

    return context.spHttpClient
      .get(locationUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response?.json();
      })
      .then((json: any) => {
        console.log(json);
        return json?.value;
      }) as Promise<any>;
  }

  public Createbuilding(
    context: WebPartContext,
    buildingTitle: object
  ): Promise<String> {
    //let restApiUrl:string=context.pageContext.web.absoluteUrl +"/_api/web/lists/getByTitle('"+ listTitle+"')/items";
    let locationUrl: string =
      context.pageContext.web.absoluteUrl +
      "/sites/demo/physicalLocation/_api/web/lists/getByTitle('Building')/items";
    const body: string = JSON.stringify(buildingTitle);
    const options: ISPHttpClientOptions = {
      headers: {
        Accept: "application/json;odata=nometadata",
        "content-type": "application/json;odata=nometadata",
        "odata-version": "",
      },
      body: body,
    };

    return new Promise<String>(async (resolve, reject) => {
      context.spHttpClient
        .post(locationUrl, SPHttpClient.configurations.v1, options)
        .then((response: SPHttpClientResponse) => {
          response.json().then(
            (result: any) => {
              resolve("Item with id created sucessfuly");
            },
            (error: any) => {
              reject("Error ocured" + error);
            }
          );
        });
    });
  }
  public Createroom(
    context: WebPartContext,
    roomTitle: object
  ): Promise<String> {
    //let restApiUrl:string=context.pageContext.web.absoluteUrl +"/_api/web/lists/getByTitle('"+ listTitle+"')/items";
    let locationUrl: string =
      context.pageContext.web.absoluteUrl +
      "/sites/demo/physicalLocation/_api/web/lists/getByTitle('Rooms')/items";
    const body: string = JSON.stringify(roomTitle);
    const options: ISPHttpClientOptions = {
      headers: {
        Accept: "application/json;odata=nometadata",
        "content-type": "application/json;odata=nometadata",
        "odata-version": "",
      },
      body: body,
    };

    return new Promise<String>(async (resolve, reject) => {
      context.spHttpClient
        .post(locationUrl, SPHttpClient.configurations.v1, options)
        .then((response: SPHttpClientResponse) => {
          response.json().then(
            (result: any) => {
              resolve("Item with id created sucessfuly");
            },
            (error: any) => {
              reject("Error ocured" + error);
            }
          );
        });
    });
  }
  public Getrooms(context: WebPartContext, roomid: String): Promise<any[]> {
    console.log("roomid" + roomid);
    //
    // "/sites/demo/physicalLocation/_api/web/lists/getbytitle('Rooms')/items?$filter[BuldingId] eq(" +//

    // let locationUrl:string=context.pageContext.web.absoluteUrl+"/sites/demo/physicalLocation/_api/web/getByTitle('Building')/items";
    let locationUrl: string =
      context.pageContext.web.absoluteUrl +
      "/sites/demo/physicalLocation/_api/web/lists/getbytitle('Rooms')/items?$filter=BuldingId eq '" +
      roomid +
      "'";

    //let resturl:string=context.
    var locationTitle: any[] = [];

    return context.spHttpClient
      .get(locationUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response?.json();
      })
      .then((json: any) => {
        console.log(json);
        return json?.value;
      }) as Promise<any>;
  }
  public Creatshelf(
    context: WebPartContext,
    roomTitle: object
  ): Promise<String> {
    //let restApiUrl:string=context.pageContext.web.absoluteUrl +"/_api/web/lists/getByTitle('"+ listTitle+"')/items";
    let locationUrl: string =
      context.pageContext.web.absoluteUrl +
      "/sites/demo/physicalLocation/_api/web/lists/getByTitle('Shelf')/items";
    const body: string = JSON.stringify(roomTitle);
    const options: ISPHttpClientOptions = {
      headers: {
        Accept: "application/json;odata=nometadata",
        "content-type": "application/json;odata=nometadata",
        "odata-version": "",
      },
      body: body,
    };

    return new Promise<String>(async (resolve, reject) => {
      context.spHttpClient
        .post(locationUrl, SPHttpClient.configurations.v1, options)
        .then((response: SPHttpClientResponse) => {
          response.json().then(
            (result: any) => {
              resolve("Item with id created sucessfuly");
            },
            (error: any) => {
              reject("Error ocured" + error);
            }
          );
        });
    });
  }

  public Getshelfs(context: WebPartContext, roomid: String): Promise<any[]> {
    console.log("roomid" + roomid);
    // "/sites/demo/physicalLocation/_api/web/lists/getbytitle('Shelf')/items?$filter=RoomId eq (" +

    // let locationUrl:string=context.pageContext.web.absoluteUrl+"/sites/demo/physicalLocation/_api/web/getByTitle('Building')/items";
    let locationUrl: string =
      context.pageContext.web.absoluteUrl +
      "/sites/demo/physicalLocation/_api/web/lists/getbytitle('Shelf')/items?$filter=RoomId eq '" +
      roomid +
      "'";

    //let resturl:string=context.
    var locationTitle: any[] = [];

    return context.spHttpClient
      .get(locationUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: any) => {
        console.log(json);
        return json.value;
      }) as Promise<any>;
  }
  public Creatboxfile(
    context: WebPartContext,
    roomTitle: object
  ): Promise<String> {
    //let restApiUrl:string=context.pageContext.web.absoluteUrl +"/_api/web/lists/getByTitle('"+ listTitle+"')/items";
    let locationUrl: string =
      context.pageContext.web.absoluteUrl +
      "/sites/demo/physicalLocation/_api/web/lists/getByTitle('BoxFile')/items";
    const body: string = JSON.stringify(roomTitle);
    const options: ISPHttpClientOptions = {
      headers: {
        Accept: "application/json;odata=nometadata",
        "content-type": "application/json;odata=nometadata",
        "odata-version": "",
      },
      body: body,
    };

    return new Promise<String>(async (resolve, reject) => {
      context.spHttpClient
        .post(locationUrl, SPHttpClient.configurations.v1, options)
        .then((response: SPHttpClientResponse) => {
          response.json().then(
            (result: any) => {
              resolve("Item with id created sucessfuly");
            },
            (error: any) => {
              reject("Error ocured" + error);
            }
          );
        });
    });
  }
  public Getboxfiles(context: WebPartContext, roomid: String): Promise<any[]> {
    console.log("roomid" + roomid);

    // let locationUrl:string=context.pageContext.web.absoluteUrl+"/sites/demo/physicalLocation/_api/web/getByTitle('Building')/items";
    let locationUrl: string =
      context.pageContext.web.absoluteUrl +
      "/sites/demo/physicalLocation/_api/web/lists/getbytitle('BoxFile')/items?$filter=ShelfId eq '" +
      roomid +
      "'";

    //let resturl:string=context.
    var locationTitle: any[] = [];

    return context.spHttpClient
      .get(locationUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: any) => {
        console.log(json);
        return json.value;
      }) as Promise<any>;
  }
  public Creatfile(
    context: WebPartContext,
    roomTitle: object
  ): Promise<String> {
    //let restApiUrl:string=context.pageContext.web.absoluteUrl +"/_api/web/lists/getByTitle('"+ listTitle+"')/items";
    let locationUrl: string =
      context.pageContext.web.absoluteUrl +
      "/sites/demo/physicalLocation/_api/web/lists/getByTitle('File')/items";
    const body: string = JSON.stringify(roomTitle);
    const options: ISPHttpClientOptions = {
      headers: {
        Accept: "application/json;odata=nometadata",
        "content-type": "application/json;odata=nometadata",
        "odata-version": "",
      },
      body: body,
    };

    return new Promise<String>(async (resolve, reject) => {
      context.spHttpClient
        .post(locationUrl, SPHttpClient.configurations.v1, options)
        .then((response: SPHttpClientResponse) => {
          response.json().then(
            (result: any) => {
              resolve("Item with id created sucessfuly");
            },
            (error: any) => {
              reject("Error ocured" + error);
            }
          );
        });
    });
  }
}

import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HandleRequestService {

  constructor() { }

  private checkIfHasArguments(object:object,args:string[])
  {
      if(typeof object!="object")
        return false;
      for(let argument of args)
      {
        let tmp = object[argument];
        if(tmp===undefined||tmp===null)
          return false;
      }
      return true;
  }

  handleError(error)
  {
      if(!this.checkIfHasArguments(error,["error"]))
        return;
      if(this.checkIfHasArguments(error.error,["message"]))
      {
        Swal.fire(
          {
            position: 'center',
            title: "Error",
            text: error.error.message,
            showConfirmButton: true,
            icon: 'error'
          }
        );
        return null;
      }
      Swal.fire(
        {
          position: 'center',
          title: "Error",
          text: "Something went wrong",
          showConfirmButton: true,
          icon: 'warning'
        }
      );
      return null;
  }

  handleErrorWithCallBack(error,callback)
  {
      if(!this.checkIfHasArguments(error,["error"]))
        return;
      if(this.checkIfHasArguments(error.error,["message"]))
      {
        Swal.fire(
          {
            position: 'center',
            title: "Error",
            text: error.error.message,
            showConfirmButton: true,
            icon: 'error'
          }
        );
        callback();
        return null;
      }
      Swal.fire(
        {
          position: 'center',
          title: "Error",
          text: "Something went wrong",
          showConfirmButton: true,
          icon: 'warning'
        }
      );
      callback();
      return null;
  }

  showSuccess()
  {
    Swal.fire(
      {
        position: 'center',
        title: "Success",
        text: "Saved with success",
        showConfirmButton: true,
        icon: 'success'
      }
    );
  }

  showSuccessWithMessage(msg:string)
  {
    Swal.fire(
      {
        position: 'center',
        title: "Success",
        text: msg,
        showConfirmButton: true,
        icon: 'success'
      }
    );
  }
}

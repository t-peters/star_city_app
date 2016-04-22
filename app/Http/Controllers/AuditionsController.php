<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Requests\NewAuditionRequest;
use App\Audition;
use App\Classes\AuditionLogics;

class AuditionsController extends Controller
{
    Public function postSave(NewAuditionRequest $r, AuditionLogics $audition) {

      $user = $audition->getUser();

      if(is_null($user)) {
        return response()->json(['code'=>'error',"response"=>'Action not Allowed']);
      }
      
      if($audition->saveAudition($r->all())) {
        return response()->json(['code'=>'success','response'=>'Audition Saved']);
      } else {
        return response()->json(['code'=>'error','response'=>'Audition not Saved']);
      }

    }

    Public function getAll(AuditionLogics $audition,$number = null) {
      if(is_null($number)) {
        return response()->json(['code'=>'success','response'=>$audition->getAll()]);
      }


    }

    Public function getViewAudition(AuditionLogics $audition, $id) {
      return response()->json(['code'=>'success','response'=>$audition->getAudition($id)]);
    }

    
}

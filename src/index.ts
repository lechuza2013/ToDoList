import { state } from "./state";
import { header as headerEl} from "../components/header";
import {form as formEl} from "../components/form";
import {list as listEl} from "../components/list";

(function (){
    state.init();
    headerEl();
    formEl();
    listEl();
})();
import Authorization from "@/utils/userValidation";
import { metadata } from "../layout";
import SacolaWarper from "./clientPage";
import PageLeyout from "@/components/pageLeyout";

metadata.title = "Sacola";

export default function Sacola() {
    return(
        <Authorization>
            <PageLeyout>
                <SacolaWarper />
            </PageLeyout>
        </Authorization>
    
    )
}
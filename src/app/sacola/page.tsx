import { metadata } from "../layout";
import SacolaWarper from "./clientPage";
import PageLeyout from "@/components/pageLeyout";

metadata.title = "Sacola";

export default function Sacola() {
    return(

        <PageLeyout>
            <SacolaWarper />
        </PageLeyout>
    )
}
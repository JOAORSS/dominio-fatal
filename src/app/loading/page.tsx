import LoadingPage from "@/components/loading";
import ActionLoad from "@/components/loading/action";

export default async function Loading(){
    return(
        <>
            <LoadingPage />
            <ActionLoad action={async () => {setTimeout(() => {console.log("bla")}, 10000)}} path="/login" />
        </>
    )
}
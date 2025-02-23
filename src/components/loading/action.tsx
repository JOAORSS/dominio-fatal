import { redirect } from "next/navigation"

export default async function ActionLoad({ action, path } : { action: () => Promise<void>, path: string }){
    
    await action()
    redirect(path);

    return null;
}
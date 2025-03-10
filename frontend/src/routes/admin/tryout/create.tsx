import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";

import { TryoutEditor } from "../../../components/TryoutEditor";
import { TRYOUT_API } from "../../../utils/api";

export const Route = createFileRoute('/admin/tryout/create')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="w-full flex justify-center p-20">
            <TryoutEditor onSubmit={async (tryout) => {
                await axios.post(TRYOUT_API, tryout);

                window.location.href = "/admin/tryout";
            }} />
        </div>
    )
}

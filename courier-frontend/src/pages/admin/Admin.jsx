import React from "react";
import { Outlet } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";


export default function Admin(){
    return (
        <div>
            <AdminLayout>
                <Outlet/>
            </AdminLayout>
        </div>
    );
}
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ImportExportIcon from '@mui/icons-material/ImportExport';

export const MenuData = [
    {
        title:"Dashboard",
        icon: <HomeIcon />,
        menuValue:0,
        path:'/',
        access:"employee",
    },
    {
        title:"Catalog",
        icon: <LocalOfferIcon/>,
        menuValue:1,
        submenu:[
           {
            title:"Categories",
            path:'/catalog/categories',
            subValue:0,
           },
           {
            title:"Products",
            subValue:1,
            path:'/catalog/products'
           },
           {
            title:"Employees",
            subValue:2,
            path:'/catalog/employees'
           },
           {
            title:"Suppliers",
            subValue:3,
            path:'/catalog/suppliers'
           },
        ]
    },
    {
        title:"Imports",
        icon: <ImportExportIcon/>,
        menuValue:2,
        access:"employee",
        submenu:[
            {
                title:"Check Import",
                subValue:0,
                path:'/imports/pending',
                access:"employee"
            },
            {
                title:"Order Import",
                subValue:1,
                path:'/import/order'
            },
        ]
    },
    {
        title:"Order",
        icon: <ShoppingCartIcon/>,
        menuValue:3,
        access:"employee",
        submenu:[
            {
                title:"New orders",
                subValue:0,
                path:'/order/pending',
                access:"employee",
            },
            {
                title:"On delivery",
                subValue:1,
                path:'/order/delivery',
                access:"employee",
            },
        ]
    },
    {
        title:"Report",
        icon: <AssessmentIcon/>,
        menuValue:4,
        submenu:[
            {
             title:"Products",
             subValue:0,
             path:'/report/products'
            },
            {
             title:"Customers",
             subValue:1,
             path:'/report/customers'
            },
            {
             title:"Orders",
             subValue:2,
             path:'/report/orders'
            },
            {
             title:"Imports",
             subValue:3,
             path:'/report/imports'
            },
            {
                title:"Revenue",
                subValue:4,
                path:'/report/revenue'
            },
         ]
    },
]
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
        path:'/'
    },
    {
        title:"Catalog",
        icon: <LocalOfferIcon/>,
        submenu:[
           {
            title:"Categories",
            path:'/catalog/categories'
           },
           {
            title:"Products",
            path:'/catalog/products'
           },
           {
            title:"Employees",
            path:'/catalog/employees'
           },
           {
            title:"Suppliers",
            path:'/catalog/suppliers'
           },
        ]
    },
    {
        title:"Imports",
        icon: <ImportExportIcon/>,
        submenu:[
            {
                title:"import",
                path:'/imports'
            },
            {
                title:"Orders",
                path:'/imports/orders'
            },
        ]
    },
    {
        title:"Order",
        icon: <ShoppingCartIcon/>,
        submenu:[
            {
                title:"New orders",
                path:'/order/pending'
            },
            {
                title:"On delivery",
                path:'/order/delivery'
            },
        ]
    },
    {
        title:"Report",
        icon: <AssessmentIcon/>,
        submenu:[
            {
             title:"Products",
             path:'/report/products'
            },
            {
             title:"Customers",
             path:'/report/customers'
            },
            {
             title:"Orders",
             path:'/report/orders'
            },
            {
             title:"Imports",
             path:'/report/imports'
            },
         ]
    },
]
import { pool } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const {uid} = await req.json()
        const Qres = await pool.query(`
            select * from dashboard 
            where user_id = $1 ;
            `,[uid])

        return NextResponse.json(Qres.rows[0])
    } catch (error) {
        return NextResponse.json({"Error":error})
    }
}
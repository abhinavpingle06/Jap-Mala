import { pool } from '@/config/db';
import { NextRequest, NextResponse } from 'next/server';
import { PoolClient } from 'pg';

interface User{
    id:number;
    name:string;
    email:string;
}

export async function GET() {
    try {
        const client = await pool.connect();
        const result = await pool.query(
            `SELECT current_database(),
         current_user,
         inet_server_addr(),
         inet_server_port();`
        );

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: 'Database error' },
            { status: 500 }
        );
    }
}

export async function POST(req:NextRequest){
    let client : PoolClient | undefined;
    try {
        const client = await pool.connect();
        const body:User = await req.json()
        const {id,name,email} = body

        await client.query('BEGIN');
        
        // Creating a user
        const QUERY = `
        insert into users (id,name,email)
        values ($1,$2,$3)
        on conflict do nothing;
        `
        const result = await client.query(QUERY,[id,name,email])

        // Creting its initial score
        await client.query(
            `
            INSERT INTO dashboard (user_id)
            VALUES ($1)
            on conflict do nothing;
            `,
            [id]
        );

        await client.query('COMMIT');

        return NextResponse.json(result)
    } catch (error) {
        if (client) {
            await client.query('ROLLBACK');
        }
        return NextResponse.json({"Error":error})
    } finally {
        if(client)
            client.release()
    }
}
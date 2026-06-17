import { pool } from '@/config/db';
import { NextRequest, NextResponse } from 'next/server';

interface User{
    id:number;
    name:string;
    email:string;
}

const client = await pool.connect();

export async function GET() {
    try {
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
    try {
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
        await client.query('ROLLBACK');
        return NextResponse.json({"Error":error})
    } finally {
        client.release()
    }
}
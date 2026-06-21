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
    let client: PoolClient | undefined = await pool.connect();
    try {
        const body = await req.json()
        const {id,name,email} = body

        await client.query('BEGIN');
        
        // Creating a user
        console.log(id,name,email)
        const QUERY = `
        insert into users (id,name,email)
        values ($1,$2,$3)
        ON CONFLICT (user_id) DO NOTHING;
        `
        const result = await client.query(QUERY,[id,name,email])

        // Creting its initial score
        await client.query(
            `
            INSERT INTO dashboard (user_id)
            VALUES ($1)
            ON CONFLICT (user_id) DO NOTHING;
            `,
            [id]
        );

        // CREATING INITIAL COUNT 
        await client.query(
            `
            INSERT INTO japa_records (user_id)
            VALUES ($1)
            ON CONFLICT (user_id) DO NOTHING;
            `,
            [id]
        );

        await client.query('COMMIT');

        return NextResponse.json({ success: true, rowCount: result.rowCount })
    } catch (error) {
        // Log full error server-side for debugging
        console.error('Error in POST /api/users:', error);

        if (client) {
            await client.query('ROLLBACK');
        }

        return NextResponse.json({ error: String(error) }, { status: 500 });
    } finally {
        if(client)
            client.release()
    }
}
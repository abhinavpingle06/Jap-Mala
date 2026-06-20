import { NextResponse } from 'next/server'
import { pool } from '@/config/db'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)

        const year = Number(searchParams.get('year'))
        const month = Number(searchParams.get('month'))
        const userId = String(searchParams.get('userId'))
        console.log(userId,year,month)

        const startDate = `${year}-${Number(String(month).padStart(2, '0'))}-01`

        const result = await pool.query(
            `
      SELECT
        japa_date::text,
        count,
        completed
      FROM japa_records
      WHERE user_id = $1
        AND japa_date >= $2::date
        AND japa_date < ($2::date + INTERVAL '1 month')
      ORDER BY japa_date
      `,
            [userId, startDate]
        )

        const creation_date = pool.query(`
            select created_at from users
            where id = $1
            `,[userId])

        return NextResponse.json({
            entries: result.rows,
            creationDate: (await creation_date).rows[0]?.created_at
        })
        
    } catch (error) {
        console.error(error)

        return NextResponse.json(
            { error: 'Failed to fetch calendar data' },
            { status: 500 }
        )
    }
}
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/config/db";

export async function POST(req: NextRequest) {
    const client = await pool.connect();

    try {
        const body = await req.json();

        const userid = body.userid;
        const rounds = Number(body.round);

        if (!userid || !rounds || rounds <= 0) {
            return NextResponse.json(
                { error: "Invalid payload" },
                { status: 400 }
            );
        }

        const totalCount = rounds * 108;

        await client.query("BEGIN");

        // Update dashboard stats
        await client.query(
            `
      UPDATE dashboard
      SET
        completed_rounds = completed_rounds + $1,
        total_lifetime_count = total_lifetime_count + $2
        WHERE user_id = $3
      `,
            [rounds, totalCount, userid]
        );

        // Store history record
        await client.query(
            `
      UPDATE japa_records
      SET 
        count = $1,
        completed = TRUE
        where user_id = $2
      `,
            [totalCount,userid]
        );

        await client.query("COMMIT");

        return NextResponse.json({
            success: true,
            rounds,
            totalCount,
        });
    } catch (err) {
        await client.query("ROLLBACK");

        console.error(err);

        return NextResponse.json(
            { error: "Failed to record japa" },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}
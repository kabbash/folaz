import { NextResponse } from 'next/server'
import { getVacancies } from '@/data/vacancies'

export async function GET() {
  try {
    const vacancies = await getVacancies()
    return NextResponse.json(vacancies)
  } catch (error) {
    console.error('Error fetching vacancies:', error)
    return NextResponse.json([], { status: 500 })
  }
}






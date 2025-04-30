import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, company, message, horario } = data;

    // Configure seu transporte SMTP (exemplo com Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'feitoai.tech@gmail.com', // Seu email
        pass: process.env.EMAIL_PASS,   // Senha de app ou variável de ambiente
      },
    });

    await transporter.sendMail({
      from: 'feitoai.tech@gmail.com',
      to: 'feitoai.tech@gmail.com',
      subject: `Novo contato do site - ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\nEmpresa: ${company}\nMensagem: ${message}${horario ? `\nHorário preferido: ${horario}` : ''}`,
      html: `<b>Nome:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Telefone:</b> ${phone}<br/><b>Empresa:</b> ${company}<br/><b>Mensagem:</b> ${message}${horario ? `<br/><b>Horário preferido:</b> ${horario}` : ''}`,    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 500 });
  }
}

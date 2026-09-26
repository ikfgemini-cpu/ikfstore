import prisma from '@/lib/prisma';
import SettingsForm from './SettingsForm';

export const revalidate = 0;

export default async function AdminSettings() {
  let settings = await prisma.settings.findFirst();
  
  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        whatsappNumber: '6281234567890',
        qrisImageUrl: ''
      }
    });
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-white">Payment & Contact Settings</h1>
      
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
        <SettingsForm initialData={settings} />
      </div>
    </div>
  );
}

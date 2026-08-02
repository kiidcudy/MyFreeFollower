"use client";

import { useEffect, useState } from "react";
import { fetchStorageStatus } from "@/lib/admin-store";

export function BlobSetupBanner() {
  const [status, setStatus] = useState<{ kv: boolean; checked: boolean }>({
    kv: true,
    checked: false,
  });

  useEffect(() => {
    fetchStorageStatus().then((s) => setStatus({ kv: s.kv, checked: true }));
  }, []);

  if (!status.checked || status.kv) return null;

  return (
    <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-4 text-sm text-amber-950">
      <p className="font-bold">⚠️ Vercel Blob storage yapılandırılmamış</p>
      <p className="mt-2">
        Görev, kullanıcı, proof ve sipariş kayıtları sunucuda saklanamaz.{" "}
        <strong>BLOB_READ_WRITE_TOKEN</strong> environment variable eksik.
      </p>
      <ol className="mt-3 list-decimal space-y-1 ps-5">
        <li>Vercel Dashboard → projen (MyFreeFollower) → <strong>Storage</strong></li>
        <li><strong>Create Database</strong> → <strong>Blob</strong> → store oluştur</li>
        <li>Store&apos;u projeye bağla (Connect to Project)</li>
        <li>
          <strong>Settings → Environment Variables</strong> →{" "}
          <code className="rounded bg-amber-100 px-1">BLOB_READ_WRITE_TOKEN</code> otomatik
          eklenmeli
        </li>
        <li>
          <strong>ADMIN_PASSWORD</strong> da tanımlı olsun → <strong>Redeploy</strong>
        </li>
      </ol>
    </div>
  );
}

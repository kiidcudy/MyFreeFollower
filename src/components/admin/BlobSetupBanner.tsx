"use client";

import { useEffect, useState } from "react";
import { fetchStorageStatus } from "@/lib/admin-store";

export function BlobSetupBanner() {
  const [status, setStatus] = useState<{
    kv: boolean;
    envKeys: string[];
    checked: boolean;
  }>({
    kv: true,
    envKeys: [],
    checked: false,
  });

  useEffect(() => {
    fetchStorageStatus().then((s) =>
      setStatus({ kv: s.kv, envKeys: s.envKeys, checked: true })
    );
  }, []);

  if (!status.checked || status.kv) return null;

  const hasTokenKey = status.envKeys.length > 0;

  return (
    <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-4 text-sm text-amber-950">
      <p className="font-bold">⚠️ Blob storage çalışmıyor (sunucu token görmüyor)</p>
      {hasTokenKey ? (
        <>
          <p className="mt-2">
            Vercel&apos;de store <strong>Connected</strong> görünse bile, mevcut deployment
            henüz <code className="rounded bg-amber-100 px-1">BLOB_READ_WRITE_TOKEN</code>{" "}
            almamış olabilir. Algılanan env anahtarları:{" "}
            <code className="rounded bg-amber-100 px-1">{status.envKeys.join(", ")}</code>
          </p>
          <ol className="mt-3 list-decimal space-y-1 ps-5">
            <li>
              Vercel → <strong>Deployments</strong> → en son deployment →{" "}
              <strong>Redeploy</strong> (Use existing Build Cache kapalı olsun)
            </li>
            <li>
              <strong>Settings → Environment Variables</strong> →{" "}
              <code className="rounded bg-amber-100 px-1">BLOB_READ_WRITE_TOKEN</code>{" "}
              Production + Preview işaretli mi kontrol et
            </li>
            <li>Redeploy sonrası admin sayfasını yenile</li>
          </ol>
        </>
      ) : (
        <>
          <p className="mt-2">
            Görev, kullanıcı, proof ve sipariş kayıtları sunucuda saklanamaz.{" "}
            <strong>BLOB_READ_WRITE_TOKEN</strong> environment variable eksik.
          </p>
          <ol className="mt-3 list-decimal space-y-1 ps-5">
            <li>
              Vercel Dashboard → projen (MyFreeFollower) → <strong>Storage</strong>
            </li>
            <li>
              <strong>Connect Database</strong> → <strong>my-free-follower-blob</strong> → Connect
            </li>
            <li>
              <strong>Settings → Environment Variables</strong> →{" "}
              <code className="rounded bg-amber-100 px-1">BLOB_READ_WRITE_TOKEN</code> otomatik
              eklenmeli
            </li>
            <li>
              <strong>ADMIN_PASSWORD</strong> tanımlı olsun → <strong>Redeploy</strong>
            </li>
          </ol>
        </>
      )}
    </div>
  );
}

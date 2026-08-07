"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { BINANCE_PAY } from "@/lib/site";
import { binancePayQrPayload } from "@/lib/binance-pay";

export function BinancePayModal({
  open,
  onClose,
  amountUsdt,
  orderNumber,
  labels,
  onConfirmPayment,
  verifying,
}: {
  open: boolean;
  onClose: () => void;
  amountUsdt: number;
  orderNumber: string;
  verifying?: boolean;
  onConfirmPayment: () => void;
  labels: {
    stepPay: string;
    stepVerify: string;
    sendToId: string;
    nickname: string;
    copy: string;
    copied: string;
    scanViaApp: string;
    uid: string;
    instruction1: string;
    instruction2: string;
    confirmPayment: string;
    orderNumber: string;
    verifyHint: string;
    close: string;
  };
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [copied, setCopied] = useState(false);
  const qrPayload = binancePayQrPayload(amountUsdt);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setCopied(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  async function copyId() {
    try {
      await navigator.clipboard.writeText(BINANCE_PAY.uid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  function handleConfirm() {
    setStep(2);
    onConfirmPayment();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50"
        onClick={onClose}
        aria-label={labels.close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={labels.stepPay}
        className="relative max-h-[95vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-center gap-3 border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-2">
            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${step === 1 ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"}`}>1</span>
            <span className={`text-sm font-semibold ${step === 1 ? "text-slate-900" : "text-slate-500"}`}>{labels.stepPay}</span>
          </div>
          <div className="h-px w-8 bg-slate-200" />
          <div className="flex items-center gap-2">
            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${step === 2 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>2</span>
            <span className={`text-sm font-semibold ${step === 2 ? "text-slate-900" : "text-slate-400"}`}>{labels.stepVerify}</span>
          </div>
        </div>

        <div className="px-6 py-6">
          {step === 1 ? (
            <>
              <p className="text-center text-3xl font-bold tracking-tight text-slate-900">{amountUsdt.toFixed(2)} USDT</p>

              <div className="mt-6">
                <label htmlFor="binance-pay-uid" className="text-sm font-medium text-slate-700">
                  {labels.sendToId}
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    id="binance-pay-uid"
                    readOnly
                    value={BINANCE_PAY.uid}
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 font-mono text-sm text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={copyId}
                    className="shrink-0 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {copied ? labels.copied : labels.copy}
                  </button>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {labels.nickname}: <strong className="text-slate-800">{BINANCE_PAY.nickname}</strong>
                </p>
              </div>

              <div className="mx-auto mt-6 max-w-xs rounded-2xl bg-[#eaecef] p-4">
                <div className="overflow-hidden rounded-xl bg-[#1e2329] shadow-lg">
                  <div className="bg-[#f0b90b] px-3 py-2 text-center">
                    <span className="text-xs font-black tracking-wider text-[#1e2329]">BINANCE PAY</span>
                  </div>
                  <div className="px-4 pb-4 pt-3">
                    <p className="text-center text-[11px] text-white/80">{labels.scanViaApp}</p>
                    <div className="mx-auto mt-3 flex h-[180px] w-[180px] items-center justify-center rounded-lg bg-white p-2">
                      <QRCodeSVG
                        value={qrPayload}
                        size={164}
                        level="M"
                        includeMargin={false}
                        role="img"
                        aria-label="Binance Pay QR"
                      />
                    </div>
                    <div className="mt-3 flex justify-between border-t border-white/10 pt-2 text-[11px] text-white/70">
                      <span>{labels.nickname}</span>
                      <span className="font-semibold text-white">{BINANCE_PAY.nickname}</span>
                    </div>
                    <div className="mt-1 flex justify-between rounded bg-black/30 px-2 py-1.5 text-[11px]">
                      <span className="text-white/60">{labels.uid}</span>
                      <span className="font-mono font-semibold text-white">{BINANCE_PAY.uid}</span>
                    </div>
                  </div>
                </div>
              </div>

              <ol className="mt-6 space-y-2 text-sm text-slate-600">
                <li className="flex gap-2"><span className="font-bold text-slate-800">1.</span><span>{labels.instruction1}</span></li>
                <li className="flex gap-2"><span className="font-bold text-slate-800">2.</span><span>{labels.instruction2}</span></li>
              </ol>

              <p className="mt-4 text-center text-xs text-slate-400">
                {labels.orderNumber}: <strong className="font-mono text-slate-600">{orderNumber}</strong>
              </p>

              <button
                type="button"
                onClick={handleConfirm}
                className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white hover:bg-blue-700"
              >
                {labels.confirmPayment}
              </button>
            </>
          ) : (
            <div className="py-4 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                {verifying ? (
                  <span className="inline-block h-7 w-7 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-blue-600" aria-hidden>
                    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{labels.stepVerify}</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">{labels.verifyHint}</p>
              <p className="mt-4 text-xs text-slate-400">
                {labels.orderNumber}: <strong className="font-mono text-slate-600">{orderNumber}</strong>
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                {labels.close}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

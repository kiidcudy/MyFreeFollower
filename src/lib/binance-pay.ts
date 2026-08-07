import { BINANCE_PAY } from "@/lib/site";

export function eurToUsdt(eur: number): number {
  return Math.round(eur * BINANCE_PAY.usdtPerEur * 100) / 100;
}

/** Deep link payload for Binance App → Pay → Scan */
export function binancePayQrPayload(amountUsdt: number): string {
  return `binance://pay/send?recipientType=UID&recipientId=${BINANCE_PAY.uid}&amount=${amountUsdt.toFixed(2)}&asset=USDT`;
}

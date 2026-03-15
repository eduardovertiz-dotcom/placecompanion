'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const PLANS = [
  {
    name: 'Single Property',
    price: '$299',
    period: '/mo',
    priceId: 'price_1TALsJBgMSWbEFIIFMFSR5Nz',
    features: [
      'AI assistant for your property',
      'Full destination intelligence',
      'Multilingual by default',
      'Website widget + QR codes',
      'Guest conversation analytics',
      'Email support',
    ],
  },
  {
    name: 'Small Group',
    price: '$549',
    period: '/mo',
    priceId: 'price_1TALnGBgMSWbEFIIYeCYeBfT',
    features: [
      'Everything in Single Property',
      'All properties on one dashboard',
      'Advanced guest intent analytics',
      'Revenue opportunity signals',
      'Staff notification routing',
      'Priority support',
    ],
  },
]

interface Props {
  propertyId: string
  userId: string
  onClose: () => void
}

export default function UpgradeModal({ propertyId, userId, onClose }: Props) {
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState('')
  const [couponError, setCouponError] = useState('')
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null)
  const [checkoutError, setCheckoutError] = useState('')

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleApplyCoupon() {
    const code = couponCode.trim().toUpperCase()
    if (code === 'FOUNDING40') {
      setAppliedCoupon(code)
      setCouponError('')
    } else if (code === '') {
      setCouponError('Enter a coupon code.')
    } else {
      setCouponError('Invalid coupon code.')
      setAppliedCoupon('')
    }
  }

  async function handleSubscribe(priceId: string) {
    setLoadingPriceId(priceId)
    setCheckoutError('')
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          coupon: appliedCoupon || undefined,
          propertyId,
          userId,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('No checkout URL returned', data)
        setCheckoutError(data.error || 'Could not start checkout. Please try again.')
        setLoadingPriceId(null)
      }
    } catch (err) {
      console.error('[UpgradeModal] checkout error', err)
      setCheckoutError('Could not start checkout. Please try again.')
      setLoadingPriceId(null)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center"
      style={{
        paddingTop: '24px',
        paddingBottom: '24px',
        paddingLeft: '16px',
        paddingRight: '16px',
        background: 'rgba(0,0,0,0.85)',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full rounded-2xl"
        style={{
          background: '#0F0D0B',
          border: '1px solid rgba(232,227,220,0.08)',
          maxHeight: 'calc(100vh - 48px)',
          overflowY: 'auto',
          maxWidth: '560px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — sticky */}
        <div
          className="sticky top-0 flex items-center justify-between px-6 md:px-10 pt-6 md:pt-10 pb-5"
          style={{ background: '#0F0D0B', borderBottom: '1px solid rgba(232,227,220,0.06)', zIndex: 10, paddingBottom: '20px' }}
        >
          <div>
            <h2 className="font-serif font-normal text-[#FFFFFF]" style={{ fontSize: '28px' }}>
              Upgrade your assistant.
            </h2>
            <p className="font-sans text-[#A8A099] mt-1" style={{ fontSize: '14px' }}>
              Keep your hotel assistant live after your trial.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#6B6560] hover:text-[#A8A099] transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 md:p-10">
          {PLANS.map((plan) => {
            const isLoading = loadingPriceId === plan.priceId
            const discounted = appliedCoupon === 'FOUNDING40'

            return (
              <div
                key={plan.priceId}
                className="rounded-xl flex flex-col"
                style={{
                  background: '#1A1715',
                  border: '1px solid rgba(232,227,220,0.06)',
                  padding: '24px',
                }}
              >
                <p className="font-sans font-medium tracking-widest text-[#6B6560] uppercase" style={{ fontSize: '11px' }}>
                  {plan.name}
                </p>

                <div className="flex items-baseline gap-1 mt-3">
                  <span className="font-serif font-light text-[#FFFFFF]" style={{ fontSize: '40px', lineHeight: 1 }}>
                    {discounted
                      ? '$' + Math.round(parseInt(plan.price.replace('$', '')) * 0.6)
                      : plan.price}
                  </span>
                  <span className="font-sans text-[#9C9A93]" style={{ fontSize: '16px' }}>{plan.period}</span>
                </div>

                {discounted && (
                  <p className="font-sans mt-1" style={{ fontSize: '12px', color: '#2D9E6B' }}>
                    40% founding partner discount applied forever
                  </p>
                )}

                <ul className="flex-1 space-y-2 mt-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 font-sans text-[#A8A099]" style={{ fontSize: '13px' }}>
                      <span className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#2D9E6B]" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.priceId)}
                  disabled={!!loadingPriceId}
                  className="font-sans font-medium w-full rounded-lg transition-colors mt-6"
                  style={{
                    height: '44px',
                    fontSize: '14px',
                    background: loadingPriceId ? 'rgba(201,106,58,0.35)' : '#C96A3A',
                    color: '#FAF9F5',
                    border: 'none',
                    cursor: loadingPriceId ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isLoading ? 'Redirecting…' : 'Subscribe'}
                </button>
              </div>
            )
          })}
        </div>

        {checkoutError && (
          <p className="font-sans px-6 md:px-8 -mt-2 mb-2" style={{ fontSize: '13px', color: '#F87171' }}>
            {checkoutError}
          </p>
        )}

        {/* Founding partner coupon */}
        <div
          className="mx-6 md:mx-10 mb-6 md:mb-10 rounded-xl p-5"
          style={{ background: '#1F1C19', border: '1px solid rgba(232,227,220,0.06)' }}
        >
          <p className="font-sans text-[#A8A099]" style={{ fontSize: '13px' }}>
            Have a founding partner code?
          </p>
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value)
                setCouponError('')
              }}
              placeholder="Enter code"
              className="font-sans flex-1 rounded-lg px-4 outline-none placeholder:text-[#6B6560]"
              style={{
                height: '40px',
                fontSize: '14px',
                background: '#1F1C19',
                border: '1px solid rgba(232,227,220,0.08)',
                color: '#FFFFFF',
              }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleApplyCoupon() }}
            />
            <button
              onClick={handleApplyCoupon}
              className="font-sans font-medium rounded-lg transition-colors px-4"
              style={{
                height: '40px',
                fontSize: '14px',
                background: 'transparent',
                border: '1px solid rgba(232,227,220,0.25)',
                color: '#A8A099',
                cursor: 'pointer',
              }}
            >
              Apply
            </button>
          </div>
          {appliedCoupon && (
            <p className="font-sans mt-2" style={{ fontSize: '12px', color: '#2D9E6B' }}>
              ✓ Code applied — 40% off forever
            </p>
          )}
          {couponError && (
            <p className="font-sans mt-2" style={{ fontSize: '12px', color: '#F87171' }}>
              {couponError}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

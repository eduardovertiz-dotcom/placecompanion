import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const { priceId, coupon, propertyId, userId } = await req.json()

    if (!priceId || !propertyId || !userId) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const host = req.headers.get('host') ?? ''
    const proto = host.startsWith('localhost') ? 'http' : 'https'
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${proto}://${host}`

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      ...(coupon ? { discounts: [{ coupon }] } : {}),
      success_url: `${siteUrl}/dashboard?success=true`,
      cancel_url: `${siteUrl}/dashboard?canceled=true`,
      metadata: { propertyId, userId, priceId },
      subscription_data: {
        metadata: { propertyId, userId },
      },
    })

    return Response.json({ url: session.url })
  } catch (err) {
    console.error('[stripe/checkout]', err)
    return Response.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}

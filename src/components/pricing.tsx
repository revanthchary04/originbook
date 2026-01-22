import React from 'react';
import { ArrowUpRight, Zap, Rocket, Sparkles, Check } from 'lucide-react';

export default function PricingSectionWrapper() {
	return (
		<div className="bg-black py-20 px-4">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-semibold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
						Plans that Scale with You
					</h2>
					<p className="text-gray-400 text-sm md:text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
						Whether you're just starting out or growing fast, our flexible pricing has you covered.
					</p>
				</div>
				
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{PLANS.map((plan, index) => (
						<div key={plan.id} className="h-full" style={{ opacity: 1 }}>
							<article className={`relative overflow-hidden rounded-2xl border ${plan.highlighted ? 'border-white/20 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]' : 'border-white/5'} bg-neutral-800/50 p-5 sm:p-6 flex flex-col h-full`}>
								{plan.highlighted && (
									<div className="absolute right-4 top-4">
										<span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] border border-blue-400 bg-blue-500 text-white">
											<Sparkles className="w-3.5 h-3.5" />
											Most popular
										</span>
									</div>
								)}
								
								<div className="flex items-center justify-between text-xs">
									<div className="inline-flex items-center gap-2 text-white/60">
										<span className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-neutral-950/80 ring-1 ${plan.highlighted ? 'ring-blue-500/20' : 'ring-white/10'} text-white/80`}>
											{String(index + 1).padStart(2, '0')}
										</span>
									</div>
								</div>
								
								<div className="mt-4 flex flex-col">
									<div>
										<h3 className="text-2xl font-medium tracking-tight text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
											{plan.name}
										</h3>
										<p className="text-sm text-white/60 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
											{plan.description}
										</p>
									</div>
									
									<div className="mt-5">
										<div className="flex items-baseline gap-1 mt-5">
											<span className="text-3xl font-medium tracking-tight text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
												{plan.price}
											</span>
											{plan.period && (
												<span className="text-sm text-white/60">/{plan.period}</span>
											)}
										</div>
										<p className="text-xs text-white/60 mt-1">
											{plan.billingInfo}
										</p>
										<button className="mt-5 inline-flex items-center justify-center gap-2 h-11 w-full rounded-full text-sm font-normal transition shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] bg-white/90 text-neutral-900 hover:bg-white">
											{plan.buttonText}
											{plan.buttonIcon === 'arrow' && <ArrowUpRight className="w-4 h-4" />}
											{plan.buttonIcon === 'zap' && <Zap className="w-4 h-4" />}
											{plan.buttonIcon === 'rocket' && <Rocket className="w-4 h-4" />}
											{plan.buttonIcon === 'sparkles' && <Sparkles className="w-4 h-4" />}
										</button>
									</div>
								</div>
								
								<div className="mt-6 flex-1 flex flex-col">
									<p className="text-xs text-white/60">{plan.featuresTitle}</p>
									<ul className="mt-3 space-y-3 flex-1">
										{plan.features.map((feature, idx) => (
											<li key={idx} className="flex items-start gap-3">
												<span className="mt-0.5 h-5 w-5 min-w-5 rounded-full bg-neutral-900/70 border border-neutral-500/20 flex items-center justify-center">
													<Check className="w-3.5 h-3.5 text-neutral-400" />
												</span>
												<span className="text-sm text-white">{feature}</span>
											</li>
										))}
									</ul>
								</div>
							</article>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

const PLANS = [
	{
		id: 'free',
		name: 'Free',
		description: 'Perfect for getting started',
		price: 'Basic',
		period: '',
		billingInfo: 'Try for free',
		buttonText: 'Get Started',
		buttonIcon: 'arrow',
		featuresTitle: 'Includes:',
		features: [
			'Up to 5 flipbooks per month',
			'Basic analytics',
			'PDF upload support',
			'50 MB storage',
			'Personal use only',
		],
	},
	{
		id: 'pro',
		name: 'Pro',
		description: 'Best for professionals',
		price: '$12',
		period: 'mo',
		billingInfo: 'Billed annually ($144)',
		buttonText: 'Subscribe',
		buttonIcon: 'zap',
		highlighted: true,
		featuresTitle: 'Everything in Free, plus:',
		features: [
			'Unlimited flipbooks',
			'Advanced analytics & tracking',
			'10 GB storage',
			'Custom branding',
			'Commercial use',
			'Lead generation forms',
			'Priority support',
		],
	},
	{
		id: 'max',
		name: 'Max',
		description: 'Maximum for power users',
		price: '$25',
		period: 'mo',
		billingInfo: 'Billed annually ($300)',
		buttonText: 'Subscribe',
		buttonIcon: 'rocket',
		featuresTitle: 'Everything in Pro, plus:',
		features: [
			'Unlimited everything',
			'Custom analytics dashboard',
			'Unlimited storage',
			'White-label solution',
			'API access',
			'Custom integrations',
			'Dedicated support',
			'All Pro features',
		],
	},
	{
		id: 'ultra',
		name: 'Enterprise',
		description: 'Enterprise plan for teams',
		price: '$99',
		period: 'mo',
		billingInfo: 'Billed annually ($1,188)',
		buttonText: 'Contact Sales',
		buttonIcon: 'sparkles',
		featuresTitle: 'Everything in Max, plus:',
		features: [
			'Custom AI limits',
			'SSO & advanced security',
			'Custom contracts',
			'Dedicated account manager',
			'Custom training',
			'99.9% SLA uptime',
			'24/7 phone support',
			'All Max features',
		],
	},
];

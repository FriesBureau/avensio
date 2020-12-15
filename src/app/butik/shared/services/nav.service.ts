import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	type?: string;
	queryParams?: string;
	megaMenu?: boolean;
	image?: string;
	active?: boolean;
	badge?: boolean;
	badgeText?: string;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	constructor() { }

	public screenWidth: any;
	public leftMenuToggle: boolean = false;
	public mainMenuToggle: boolean = false;

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			title: 'butik', type: 'sub', active: false, children: [
				{ path: '/butik/elektronik', queryParams: '{{ category:elektronik }}', title: 'elektronik', type: 'link' },

			{
					title: 'tøj', type: 'sub', active: false, children: [
						{ path: '/butik/fashion', title: 'fashion-01', type: 'link' },
						{ path: '/butik/fashion-2', title: 'fashion-02', type: 'link' },
						{ path: '/butik/fashion-3', title: 'fashion-03', type: 'link' }
					]
				},
				{ path: '/butik/furniture', title: 'møbler', type: 'link' },
				/*	
				{ path: '/butik/vegetable', title: 'vegetable', type: 'link' },
				{ path: '/butik/watch', title: 'watch', type: 'link' },
			
				{ path: '/butik/flower', title: 'flower', type: 'link' },
				{ path: '/butik/beauty', title: 'beauty', type: 'link' },
				,
				{ path: '/butik/pets', title: 'pets', type: 'link' },
				{ path: '/butik/gym', title: 'gym', type: 'link' },
				{ path: '/butik/tools', title: 'tools', type: 'link' },
				{ path: '/butik/shoes', title: 'shoes', type: 'link' },
				{ path: '/butik/bags', title: 'bags', type: 'link' },
				{ path: '/butik/marijuana', title: 'marijuana', type: 'link' } */
			]
		},
		{
			title: 'Visning', type: 'sub', active: false, children: [
				{ path: '/shop/collection/left/sidebar',   title: 'venstre-sidemenu', type: 'link' },
				{ path: '/shop/collection/right/sidebar', title: 'højre-sidemenu', type: 'link' },
				{ path: '/shop/collection/no/sidebar', title: 'ingen-sidemenu', type: 'link' }
			]
		},
		{
			title: 'Produkter', type: 'sub', active: false, children: [
				{
					title: 'sidebar', type: 'sub', active: false, children: [
						{ path: '/shop/product/left/sidebar/', title: 'venstre-sidemenu', type: 'link' },
						{ path: '/shop/product/right/sidebar/', title: 'højre-sidemenu', type: 'link' },
						{ path: '/shop/product/no/sidebar/', title: 'ingen-sidemenu', type: 'link' }
					]
				},
				{ path: '/shop/product/three/column/belted-dress', title: 'tre-kolonner', type: 'link' },
				{ path: '/shop/product/four/image/belted-dress', title: 'fire-billeder', type: 'link' },
				{ path: '/shop/product/bundle/belted-dress', title: 'samling-af-produkter', type: 'link' },
				{ path: '/shop/product/image/outside/belted-dress', title: 'billede-udenfor', type: 'link' }
			]
		},/*
		{
			title: 'Struktur', type: 'sub', megaMenu: true, badge: true, badgeText: 'new', active: false, children: [
				{
					title: 'galleri', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'portefølje-gitter-2', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'portefølje-gitter-3', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'portefølje-gitter-4', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'mursten-gitter-2', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'mursten-gitter-3', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'mursten-gitter-4', type: 'link' },
						{ path: '/pages/portfolio/masonry/full-width', title: 'mursten-fuld-bredde', type: 'link' }
					]
				},
				{
					title: 'tilføj-til-kurv', type: 'sub', active: false, children: [
						{ path: '/home/vegetable', title: 'kurv-højre', type: 'link' },
						{ path: '/home/watch', title: 'kurv-venstre', type: 'link' },
						{ path: '/home/furniture', title: 'kurv-top', type: 'link' },
						{ path: '/home/flower', title: 'kurv-bund', type: 'link' },
						{ path: '/home/fashion', title: 'kurv-popup', type: 'link' }
					]
				},
				{
					title: 'skabelon-elementer', type: 'sub', active: false, children: [
						{ path: '/elements/theme/title', title: 'title', type: 'link' },
						{ path: '/elements/theme/collection-banner', title: 'kollektion-banner', type: 'link' },
						{ path: '/elements/theme/home-slider', title: 'forside-slider', type: 'link' },
						{ path: '/elements/theme/category', title: 'kategori', type: 'link' },
						{ path: '/elements/theme/services', title: 'ydelser', type: 'link' }
					]
				},
				{
					title: 'produkt-elementer', type: 'sub', active: false, children: [
						{ path: '/elements/product/slider', title: 'produkt-slider', type: 'link' },
						{ path: '/elements/product/banners', title: 'bannere', type: 'link' },
						{ path: '/elements/product/tabs', title: 'produkt-tabs', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'multi-slider', type: 'link' }
					]
				},
				{
					title: 'email-skabelon', type: 'sub', active: false, children: [
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success.html', title: 'ordre-succes', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success-two.html', title: 'ordre-succes-2', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template.html', title: 'email-skabelon', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template-two.html', title: 'email-skabelon-2', type: 'extTabLink' }
					]
				}
			]
		},*/
		{
			title: 'sider', type: 'sub', active: false, children: [
				{
					title: 'konto', type: 'sub', active: false, children: [
						{ path: '/pages/wishlist', title: 'ønskeliste', type: 'link' },
						{ path: '/pages/cart', title: 'kurv', type: 'link' },
						{ path: '/pages/dashboard', title: 'skrivebord', type: 'link' },
						{ path: '/pages/login', title: 'log ind', type: 'link' },
						{ path: '/pages/register', title: 'opret bruger', type: 'link' },
						{ path: '/pages/contact', title: 'kontakt', type: 'link' },
						{ path: '/pages/forget/password', title: 'glemt-adgangskode', type: 'link' },
						{ path: '/pages/profile', title: 'profil', type: 'link' },
						{ path: '/pages/checkout', title: 'checkud', type: 'link' },
					]
				},
			/*	{ path: '/pages/aboutus', title: 'om-os', type: 'link' },
				{ path: '/pages/search', title: 'søg', type: 'link' },
			 
				{ path: '/pages/typography', title: 'typografi', type: 'link', badge: true, badgeText: 'new' },
		 
	 { path: '/pages/review', title: 'anmeldelser', type: 'link', badge: true, badgeText: 'new' }, */
				{ path: '/pages/order/success', title: 'ordre-succes', type: 'link' },
/*					{ 
						title: 'sammenlign', type: 'sub', active: false, children: [
							{ path: '/pages/compare/one', title: 'compare-1', type: 'link' },
							{ path: '/pages/compare/two', title: 'compare-2', type: 'link', badge: true, badgeText: 'new' }
						]
					}, 
				{ path: '/pages/collection', title: 'kollektion', type: 'link' }, 
				{ path: '/pages/lookbook', title: 'lookbook', type: 'link' },
 			{ path: '/pages/404', title: '404', type: 'link' },
				{ path: '/pages/comingsoon', title: 'kommer-snart', type: 'link', badge: true, badgeText: 'new' },
				{ path: '/pages/faq', title: 'faq', type: 'link' } */
			]
		},
		{
			title: 'blog', type: 'sub', active: false, children: [
				{ path: '/pages/blog/left/sidebar', title: 'venstre-sidebar', type: 'link' },
				{ path: '/pages/blog/right/sidebar', title: 'højre-sidebar', type: 'link' },
				{ path: '/pages/blog/no/sidebar', title: 'ingen-sidebar', type: 'link' },
				{ path: '/pages/blog/details', title: 'blog-detaljer', type: 'link' }
			]
		}
	];

	LEFTMENUITEMS: Menu[] = [
		{
			title: 'clothing', type: 'sub', megaMenu: true, active: false, children: [
			  {
				  title: 'mens fashion',  type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'top',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'shirts',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' }
				  ]
			  },
			  {
				  title: 'women fashion',  type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'dresses',  type: 'link' },
					  { path: '/home/fashion', title: 'skirts',  type: 'link' },
					  { path: '/home/fashion', title: 'westarn wear',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom wear',  type: 'link' }
				  ]
			  },
			]
		},
		{
			title: 'bags', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'shopper bags', type: 'link' },
			  { path: '/home/fashion', title: 'laptop bags', type: 'link' },
			  { path: '/home/fashion', title: 'clutches', type: 'link' },
			  {
				  path: '/home/fashion', title: 'purses', type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'purses',  type: 'link' },
					  { path: '/home/fashion', title: 'wallets',  type: 'link' },
					  { path: '/home/fashion', title: 'leathers',  type: 'link' },
					  { path: '/home/fashion', title: 'satchels',  type: 'link' }
				  ]
			  },
			]
		},
		{
			title: 'footwear', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'sport shoes', type: 'link' },
			  { path: '/home/fashion', title: 'formal shoes', type: 'link' },
			  { path: '/home/fashion', title: 'casual shoes', type: 'link' }
			]
		},
		{
			path: '/home/fashion', title: 'watches', type: 'link'
		},
		{
			title: 'Accessories', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'fashion jewellery', type: 'link' },
			  { path: '/home/fashion', title: 'caps and hats', type: 'link' },
			  { path: '/home/fashion', title: 'precious jewellery', type: 'link' },
			  {
				  path: '/home/fashion', title: 'more..', type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'necklaces',  type: 'link' },
					  { path: '/home/fashion', title: 'earrings',  type: 'link' },
					  { path: '/home/fashion', title: 'rings & wrist wear',  type: 'link' },
					  {
						  path: '/home/fashion', title: 'more...',  type: 'link', active: false, children: [
							  { path: '/home/fashion', title: 'ties',  type: 'link' },
							  { path: '/home/fashion', title: 'cufflinks',  type: 'link' },
							  { path: '/home/fashion', title: 'pockets squares',  type: 'link' },
							  { path: '/home/fashion', title: 'helmets',  type: 'link' },
							  { path: '/home/fashion', title: 'scarves',  type: 'link' },
							  {
								  path: '/home/fashion', title: 'more...',  type: 'link', active: false, children: [
									  { path: '/home/fashion', title: 'accessory gift sets',  type: 'link' },
									  { path: '/home/fashion', title: 'travel accessories',  type: 'link' },
									  { path: '/home/fashion', title: 'phone cases',  type: 'link' }
								  ]
							  },
						]
					  }
				  ]
			  },
			]
		},
		{
			path: '/home/fashion', title: 'house of design', type: 'link'
		},
		{
			title: 'beauty & personal care', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'makeup', type: 'link' },
			  { path: '/home/fashion', title: 'skincare', type: 'link' },
			  { path: '/home/fashion', title: 'premium beaty', type: 'link' },
			  {
				  path: '/home/fashion', title: 'more..', type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'fragrances',  type: 'link' },
					  { path: '/home/fashion', title: 'luxury beauty',  type: 'link' },
					  { path: '/home/fashion', title: 'hair care',  type: 'link' },
					  { path: '/home/fashion', title: 'tools & brushes',  type: 'link' }
				  ]
			  },
			]
		},
		{
			path: '/home/fashion', title: 'home & decor', type: 'link'
		},
		{
			path: '/home/fashion', title: 'kitchen', type: 'link'
		},
	];

	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	leftMenuItems = new BehaviorSubject<Menu[]>(this.LEFTMENUITEMS);

}

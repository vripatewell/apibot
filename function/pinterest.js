const cheerio = require('cheerio');
const fetch = require('node-fetch');
const axios = require("axios")

async function pinterest2(query) {
	return new Promise(async (resolve, reject) => {
		const baseUrl = 'https://www.pinterest.com/resource/BaseSearchResource/get/';
		const queryParams = {
			source_url: '/search/pins/?q=' + encodeURIComponent(query),
			data: JSON.stringify({
				options: {
					isPrefetch: false,
					query,
					scope: 'pins',
					no_fetch_context_on_resource: false
				},
				context: {}
			}),
			_: Date.now()
		};
		const url = new URL(baseUrl);
		Object.entries(queryParams).forEach(entry => url.searchParams.set(entry[0], entry[1]));
		try {
			const json = await (await fetch(url.toString())).json();
			const results = json.resource_response?.data?.results?? [];
			const result = results.map(item => ({
				pin: 'https://www.pinterest.com/pin/' + item.id?? '',
				link: item.link?? '',
				created_at: (new Date(item.created_at)).toLocaleDateString('id-ID', {
					day: 'numeric',
					month: 'long',
					year: 'numeric'
				}) ?? '',
				id: item.id?? '',
				images_url: item.images?.['736x']?.url?? '',
				grid_title: item.grid_title?? ''
			}));
			resolve(result);
		} catch (e) {
			reject(e)
		}
	});
}

function pinterest(query){


return new Promise(async(resolve,reject) => {


axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + query, {


headers: {


"cookie" : "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"


}


}).then(({ data }) => {


const $ = cheerio.load(data)


const result = [];


const hasil = [];


 $('div > a').get().map(b => {


const link = $(b).find('img').attr('src')


result.push(link)


});


result.forEach(v => {


if(v == undefined) return


hasil.push(v.replace(/236/g,'736'))


})


hasil.shift();


resolve(hasil)


})


})


}


module.exports = { pinterest2, pinterest }
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4">Gas Rate Calculator UK</h3>
            <p className="text-slate-400 text-sm">
              Free <strong>gas rate calculator</strong> for UK Gas Safe registered engineers.
              Calculate appliance heat input in kW from meter readings or test dial.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Calculators</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/#calculator" className="hover:text-orange-400 transition-colors">Gas Rate Calculator</Link></li>
              <li><Link href="/gas-bill-calculator" className="hover:text-orange-400 transition-colors">Gas Bill Calculator</Link></li>
              <li><Link href="/gas-cost-calculator" className="hover:text-orange-400 transition-colors">Gas Cost Calculator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/articles" className="hover:text-orange-400 transition-colors">Guides</Link></li>
              <li><a href="https://www.gassaferegister.co.uk/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Gas Safe Register</a></li>
              <li><a href="https://www.hse.gov.uk/gas/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">HSE Gas Safety</a></li>
              <li><a href="https://www.citizensadvice.org.uk/consumer/energy/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Energy Advice</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/contact" className="hover:text-orange-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-orange-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Gas Rate Calculator UK. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Free <strong>gas rate calculator</strong> for UK gas engineers.
            This tool is provided for reference only. Always follow Gas Safe regulations.
          </p>
        </div>
      </div>
    </footer>
  )
}

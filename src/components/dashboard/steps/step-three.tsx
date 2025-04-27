import { ScrollArea } from '@/components/ui/scroll-area'

export function StepThree() {
  return (
    <div className="p-4 rounded-md h-[500px]">
      <ScrollArea className="h-full pr-4">
        <div className="space-y-4">
          {/* <Button className="text-center text-sm bg-lime-100 text-lime-700 border border-lime-300 hover:bg-lime-200 hover:border-lime-400 cursor-pointer ">
            Connect to Supplier
          </Button> */}

          <div className="bg-primary/50 text-primary-foreground p-3 rounded-md font-semibold text-sm">
            🚀 Crew └── 📋 Task: 1def763c-76e5-4c58-9cd1-834006610153
          </div>

          <div className="border-l-4 border-lime-300 bg-muted/50 p-3 rounded-md">
            <div className="font-medium text-sm flex flex-col">
              <div className="flex flex-row gap-2 space-y-2">
                <span className="text-lime-600">Agent as</span>
                <span>Patagonia Sustainability and Procurement Manager</span>
              </div>
              <div>
                <strong>Task</strong> → Engage in a short conversation with the
                supplier to discuss sustainability issues and concerns.
              </div>
            </div>
          </div>

          <div className="text-sm text-italic rounded-md">
            Thought: I need to inform the supplier about Patagonia&apos;s
            sustainability standards. The best way to do this is by sending an
            email. Before sending the email, I should retrieve Patagonia&apos;s
            official sustainability requirements to include in the message.
          </div>

          <div className="bg-primary/50 text-primary-foreground p-3 rounded-md font-semibold text-sm">
            Tool └── get_patagonia_sustainability_requirements
          </div>

          <div className="text-sm rounded-md">
            <div className="text-xs font-mono bg-black/5 dark:bg-white/5 p-2 rounded overflow-x-auto max-w-full">
              {
                '{environmental_standards: ["100% truthful reporting of resource usage and emissions", "Water usage below industry average for all materials", "Certified organic for all natural fibers", "No harmful chemicals from Patagonia\'s restricted substances list", "Minimum 50% recycled content for synthetic materials", "Transparent supply chain with full traceability"], social_standards: ["Fair wages for all workers in the supply chain", "Safe working conditions meeting international standards", "No child labor or forced labor", "Freedom of association for workers", "Community investment programs"], certification_requirements: ["Global Organic Textile Standard (GOTS) for organic materials", "Global Recycled Standard (GRS) for recycled materials", "bluesign system partner for chemical management", "Fair Trade certification preferred"], compliance_process: "Annual audits with quarterly check-ins, immediate reporting of any standards violations, corrective action plans with clear timelines"}'
              }
            </div>
          </div>

          <div className="border-l-4 border-lime-300 bg-muted/50 p-3 rounded-md text-sm gap-2">
            <span className="text-lime-600 mr-1">Agent as</span>
            <span>Patagonia Sustainability and Procurement Manager</span>
          </div>

          <div className="text-sm text-italic rounded-md">
            Thought: I have retrieved Patagonia&apos;s sustainability
            requirements. Now I need to compose an email to the supplier
            outlining these standards and emphasizing their importance.
          </div>

          <div className="bg-primary/50 text-primary-foreground p-3 rounded-md font-semibold text-sm">
            Tool └── email_supplier
          </div>

          <div className="text-sm rounded-md">
            <div className="text-xs font-mono bg-black/5 dark:bg-white/5 p-2 rounded overflow-x-auto max-w-full">
              {
                '{"email_content": "Subject: Partnership in Sustainability: Patagonia\'s Standards and Expectations\\n\\nDear Supplier,\\n\\nWe are writing to you today as a valued partner in Patagonia\'s mission..."}'
              }
            </div>
          </div>

          <div className="border-l-4 border-lime-300 bg-muted/50 p-3 rounded-md text-sm gap-2">
            <span className="text-lime-600 mr-1">Agent as</span>
            <span>Patagonia Sustainability and Procurement Manager</span>
          </div>

          <div className="text-sm text-italic rounded-md">
            Thought: The email failed to send due to an encoding error. This is
            likely caused by special characters like the registered trademark
            symbol (®) in &quot;bluesign®&quot;. I need to remove these
            characters and resend the email.
          </div>

          <div className="text-xs font-mono bg-black/5 dark:bg-white/5 p-2 rounded">
            {
              '{status: "sent", message: "Email sent to supplier successfully", details: {to: "supplier@example.com", subject: "Patagonia: Sustainability Inquiry"}}'
            }
          </div>

          <div className="font-medium mb-2">Final Output</div>
          <div className="border-l-4 border-dashed border-lime-300 bg  p-4 rounded-md prose">
            <div className="text-sm">
              Subject: Partnership in Sustainability: Patagonia&apos;s Standards
              and Expectations
              <br />
              <br />
              Dear Supplier,
              <br />
              <br />
              We are writing to you today as a valued partner in
              Patagonia&apos;s mission to build the best product while causing
              no unnecessary harm to the environment. As a company deeply
              committed to environmental and social responsibility, we uphold
              rigorous sustainability standards throughout our supply chain.
              <br />
              <br />
              Our sustainability requirements cover several key areas:
              <br />
              <br />
              <strong>Environmental Standards:</strong>
              <br />
              * 100% truthful reporting of resource usage and emissions.
              <br />
              * Water usage below industry average for all materials.
              <br />
              * Certified organic for all natural fibers.
              <br />
              * No harmful chemicals from Patagonia&apos;s restricted substances
              list.
              <br />
              * Minimum 50% recycled content for synthetic materials.
              <br />
              * Transparent supply chain with full traceability.
              <br />
              <br />
              <strong>Social Standards:</strong>
              <br />
              * Fair wages for all workers in the supply chain.
              <br />
              * Safe working conditions meeting international standards.
              <br />
              * No child labor or forced labor.
              <br />
              * Freedom of association for workers.
              <br />
              * Community investment programs.
              <br />
              <br />
              Thank you for your commitment to sustainability.
              <br />
              <br />
              Sincerely,
              <br />
              [Patagonia Sustainability and Procurement Manager]
            </div>
          </div>

          <div className="bg-primary/50 text-primary-foreground p-3 rounded-md font-semibold text-sm">
            🚀 Crew └── 📋 Task: 1def763c-76e5-4c58-9cd1-834006610153 Status: ✅
            Completed
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

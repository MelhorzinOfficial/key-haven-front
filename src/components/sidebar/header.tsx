import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

/**
 * Renders the sidebar header with a dropdown menu trigger labeled "KeyHaven".
 *
 * @returns The sidebar header component containing a dropdown menu trigger.
 *
 * @remark The heading is intended to be concatenated with the project logo in a future update.
 */
export function HeaderSidebar() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <h1>KeyHaven</h1> {/*  TODO: Fazer uma concatenação com a logo do projeto */}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

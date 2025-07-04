import { render, screen } from '@testing-library/react';
import ProgressBar from './Progressbar';

describe('ProgressBar component', () => {
    it('renders with default props and shows correct percentage', () => {
        render(<ProgressBar value={50} />);

        const progressEl = screen.getByRole('progressbar');

        expect(progressEl).toHaveAttribute('aria-valuenow', '50');
        expect(progressEl).toHaveAttribute('aria-valuemax', '100');
        expect(progressEl).toHaveAttribute('aria-valuemin', '0');

        // Label is visible by default
        expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('renders with custom max and calculates percentage correctly', () => {
        render(<ProgressBar value={25} max={50} />);
        expect(screen.getByText('50%')).toBeInTheDocument(); // 25/50 = 50%
    });

    it('applies the correct color, size, striped, and animated classes', () => {
        render(
            <ProgressBar
                value={80}
                color="success"
                size="large"
                striped
                animated
                className="custom-class"
            />
        );

        const container = screen.getByRole('progressbar');
        expect(container.className).toContain('progress-container');
        expect(container.className).toContain('large');
        expect(container.className).toContain('custom-class');

        const bar = container.querySelector('.progress-bar');
        expect(bar?.className).toContain('success');
        expect(bar?.className).toContain('striped');
        expect(bar?.className).toContain('animated');
    });

    it('hides the label when showLabel is false', () => {
        render(<ProgressBar value={60} showLabel={false} />);
        expect(screen.queryByText(/%/)).not.toBeInTheDocument();
    });

    it('caps the percentage at 100 if value > max', () => {
        render(<ProgressBar value={150} max={100} />);
        expect(screen.getByText('100%')).toBeInTheDocument();
    });
});
